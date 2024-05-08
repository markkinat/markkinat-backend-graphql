import { DropType } from '../entities/setting.entity';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooSchema } from 'mongoose';

@InputType()
export class UpdateSettingInput {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  paymentToken?: string;

  @Field(() => String)
  dropType?: DropType;

  @Field(() => Number)
  dropAmount?: number;

  @Field(() => Boolean)
  draft?: boolean;

  @Field(() => Date)
  mintStartDate?: Date;

  @Field(() => Date)
  mintEndDate?: Date;
}
