import { Injectable } from '@nestjs/common';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooSchema } from 'mongoose';
import { Collection, CollectionDocument } from './entities/collection.entity';
import { SettingsService } from 'src/settings/settings.service';
import { CreateSettingInput } from 'src/settings/dto/create-setting.input';
import { UserService } from 'src/user/user.service';
import { CreateEarningInput } from 'src/earnings/dto/create-earning.input';
import { EarningsService } from 'src/earnings/earnings.service';
import { error } from 'console';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name)
    private collectionModel: Model<CollectionDocument>,
    private settingsService: SettingsService,
    private userService: UserService,
    private earningsService: EarningsService,
    // private ear
  ) {}

  async createCollection(
    createCollectionInput: CreateCollectionInput,
  ): Promise<Collection> {
    try {
      // create user and collection, create setting and assign to collection, create earning and assign to collection
      const createdUser = await this.userService.create({
        walletAddress: createCollectionInput.userWalletAddress,
      });

      console.log('createdUser', createdUser);

      const createCollection = new this.collectionModel(createCollectionInput);
      let createdCollection = await createCollection.save();

      const createSetting = new CreateSettingInput();
      createSetting.collectionID = createdCollection._id;

      const createdSettings =
        await this.settingsService.createSetting(createSetting);

      const createEarning = new CreateEarningInput();
      createEarning.collectionID = createdCollection._id;

      console.log('createEarning=createEarning=createEarning', createEarning);
      const createdEarning =
        await this.earningsService.createEarnings(createEarning);

      createdCollection.setting = createdSettings;
      createdCollection.earning = createdEarning;
      createCollection.creatorId = createdUser._id;

      createdCollection = await createCollection.save();
      const coll = createdUser.userCollections;
      coll.push(createdCollection);
      this.userService.updateUserCollections(createdUser.walletAddress, coll);
      return createCollection;
    } catch (error) {
      throw new Error(error);
    }
  }

  // this.userService.updateUserCollections()
  // await foundUser.f({ walletAddress: createCollectionInput.userWalletAddress }, {$push : {userCollections : createdCollection}})
  async findAll() {
    return await this.collectionModel.find();
  }

  async getCollectionById(id: MongooSchema.Types.ObjectId) {
    return this.collectionModel.findById(id).then((collection) => {
      if (collection === null) throw new Error('Not found...');
      return collection.toObject();
    });
  }

  async updateCollectionById(
    id: MongooSchema.Types.ObjectId,
    updateCollectionInput: UpdateCollectionInput,
  ) {
    return this.collectionModel.findByIdAndUpdate(
      id,
      {
        $set: updateCollectionInput,
      },
      {
        new: true,
      },
    );
  }

  // get all collections of a user
  async getUserCollections(userId: string) {
    const collections = await this.collectionModel.find({
      creatorId: userId,
    });

    // if (!collections) throw new Error('Not found...');
    return collections;
  }

  //get user collection by wallet address
  async getUserCollectionsByWalletAddress(walletAddress: string) {
    // get user by wallet address
    const user = await this.userService.getUserByWalletAddress(walletAddress);

    console.log('user', user);
    // if (!user) throw new error('User with Wallet Addres');
    if (user === null)
      throw new Error('User with Wallet Address Does not Exist');

    // get user collections

    const collections = await this.collectionModel.find({
      creatorId: user._id,
    });

    if (!collections) throw new Error('Not found...');

    return collections;
  }
}
