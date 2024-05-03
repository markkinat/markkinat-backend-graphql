import { SettingType } from '../entities/setting.entity';
import { CreateSettingInput } from './create-setting.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooSchema } from 'mongoose';

@InputType()
export class UpdateSettingInput {
  @Field()
  id: MongooSchema.Types.ObjectId;
  @Field(() => String, { nullable: true })
  paymentToken?: string;

  @Field(() => SettingType, { nullable: true })
  settingType?: SettingType;

  @Field(() => Number, { nullable: true })
  royalty?: number;

  @Field(() => Boolean, { nullable: true })
  draft?: boolean;

  @Field(() => Date, { nullable: true })
  mintStartDate?: Date;

  @Field(() => Date, { nullable: true })
  mintEndDate?: Date;
}
