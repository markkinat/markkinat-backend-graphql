import { Injectable } from '@nestjs/common';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooSchema } from 'mongoose';
import { Collection, CollectionDocument } from './entities/collection.entity';
import { SettingsService } from 'src/settings/settings.service';
import { CreateSettingInput } from 'src/settings/dto/create-setting.input';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name) private collectionModel: Model<CollectionDocument>,
    private settingsService: SettingsService,
    private userService: UserService
  ) { }

  createCollection(createCollectionInput: CreateCollectionInput): Collection {
    try {
      const foundUser: Promise<User> = this.userService.getUserByWalletAddress(createCollectionInput.userWalletAddress);
      const createCollection = new this.collectionModel(createCollectionInput);
      const createSetting = new CreateSettingInput();
      const createdSettings = this.settingsService.createSetting(createSetting);
      createCollection.setting = createdSettings.toString();
      const createdCollection = createCollection.save();
      
      return createCollection.toObject();
    } catch(error){
      throw new Error(error);
    }
  }

  findAll() {
    return this.collectionModel.find();
  }

  async getCollectionById(id: MongooSchema.Types.ObjectId):Promise<Collection> {
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

  removeCollection(id: MongooSchema.Types.ObjectId) {
    return this.collectionModel.findByIdAndDelete(id);
  }
}
