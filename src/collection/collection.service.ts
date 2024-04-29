import { Injectable } from '@nestjs/common';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooSchema } from 'mongoose';
import { Collection, CollectionDocument } from './entities/collection.entity';
import { SettingsService } from 'src/settings/settings.service';
import { CreateSettingInput } from 'src/settings/dto/create-setting.input';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<CollectionDocument>,
    private settingsService: SettingsService,
    private userService: UserService
  ) { }

  createCollection(createCollectionInput: CreateCollectionInput): Collection {
    try {
      const foundUser = this.userService.getUserByWalletAddress(createCollectionInput.userWalletAddress);
      const createCollection = new this.collectionModel(createCollectionInput);
      const createSetting = new CreateSettingInput();
      const createdSettings = this.settingsService.createSetting(createSetting);
      createCollection.setting = createdSettings;
      createCollection.creator = createCollectionInput.userWalletAddress;
      createCollection.collaborators.add(createCollectionInput.userWalletAddress);
      const createdCollection = createCollection.save();
      foundUser.findOneAndUpdate({ walletAddress: createCollectionInput.userWalletAddress }, {$push : {userCollections : createdCollection}})
      return createCollection.toObject();
    } catch(error){
      throw new Error(error);
    }
  }

  findAll() {
    return this.collectionModel.find();
  }

  async getCollectionById(id: MongooSchema.Types.ObjectId) {
    return this.collectionModel.findById(id).then((collection) => {
      if (collection === null) throw new Error("Not found...");
      return collection.toObject();
    });
  }

  async updateCollectionById(id: MongooSchema.Types.ObjectId, updateCollectionInput: UpdateCollectionInput) {
    return this.collectionModel.
      findByIdAndUpdate(id, updateCollectionInput, { new: true })
      .then(updatedCollection => {
      if (updatedCollection === null) throw new Error("could not update collection");
      return updatedCollection.toObject();
    });
  }

  addCollaborator(id: MongooSchema.Types.ObjectId, collaboratorAddress: string, adminAddress: string) {
    return this.collectionModel.findByIdAndUpdate(id).then((collection) => {
      if (collection.collaborators.has(adminAddress)) {
        collection.collaborators.add(collaboratorAddress);
      } else throw new Error("only collaborator allowed to perform this action...");
    });
  }

  removeCollaborator(id: MongooSchema.Types.ObjectId, collaboratorAddress: string, adminAddress: string) {
    return this.collectionModel.findByIdAndUpdate(id).then((collection) => {
      if (collection.creator === adminAddress) {
        collection.collaborators.delete(collaboratorAddress);
      } else throw new Error("Only Collection creator allowed to perform action...");
    });
  }

  // removeCollection(id: MongooSchema.Types.ObjectId) {
  //   return this.collectionModel.findByIdAndDelete(id);
  // }
}
