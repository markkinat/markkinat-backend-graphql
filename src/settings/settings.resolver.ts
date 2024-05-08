import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SettingsService } from './settings.service';
import { Setting } from './entities/setting.entity';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { Schema as MongooSchema } from 'mongoose';

@Resolver(() => Setting)
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  @Mutation(() => Setting)
  createSetting(
    @Args('createSettingInput') createSettingInput: CreateSettingInput,
  ) {
    return this.settingsService.createSetting(createSettingInput);
  }

  // @Query(() => [Setting], { name: 'settings' })
  // findAll() {
  //   return this.settingsService.findAll();
  // }

  @Query(() => Setting, { name: 'setting' })
  findOne(@Args('id', { type: () => Int }) id: MongooSchema.Types.ObjectId) {
    return this.settingsService.getSettingById(id);
  }

  @Mutation(() => Setting)
  updateSetting(
    @Args('updateSettingInput') updateSettingInput: UpdateSettingInput,
  ) {
    return this.settingsService.updateSettingById(
      updateSettingInput._id,
      updateSettingInput,
    );
  }

  @Mutation(() => Setting)
  removeSetting(
    @Args('id', { type: () => Int }) id: MongooSchema.Types.ObjectId,
  ) {
    return this.settingsService.removeSettingById(id);
  }
}
