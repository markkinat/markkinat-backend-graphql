import { Injectable } from '@nestjs/common';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { Setting } from './entities/setting.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooSchema } from 'mongoose';

@Injectable()
export class SettingsService {

  constructor(
    @InjectModel(Setting.name) private settingsModel: Model<Setting>,
  ) { }
  async createSetting(createSettingInput: CreateSettingInput) : Promise<Setting> {
    try {
      const createdSettings = new this.settingsModel(createSettingInput);
      return createdSettings.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSettingById(id: MongooSchema.Types.ObjectId) {
    return this.settingsModel.findById(id).then((foundSetting) => {
      if (foundSetting === null) throw new Error("Not found...");
      return foundSetting;
    });
  }

  async updateSettingById(id: MongooSchema.Types.ObjectId, updateSettingInput: UpdateSettingInput) {
    return this.settingsModel.findOneAndReplace({ _id: id },
      updateSettingInput,
      { new: true }
    ).then(updatedSetting => {
      if (updatedSetting === null) throw new Error("Not found...");
      return updatedSetting.toObject();
    });
  }

  removeSettingById(id: MongooSchema.Types.ObjectId) {
    return this.settingsModel.findByIdAndDelete({_id: id});
  }
}
