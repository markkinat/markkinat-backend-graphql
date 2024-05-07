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

      const createCollection = new this.collectionModel(createCollectionInput);
      let createdCollection = await createCollection.save();

      const createSetting = new CreateSettingInput();
      createSetting.collectionID = createdCollection._id;

      const createdSettings =
        await this.settingsService.createSetting(createSetting);

      const createEarning = new CreateEarningInput();
      createEarning.collectionID = createCollection._id;
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
}
