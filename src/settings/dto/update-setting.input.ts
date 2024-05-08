import { DropType } from '../entities/setting.entity';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooSchema } from 'mongoose';

@InputType()
export class UpdateSettingInput {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  paymentToken?: string;

  @Field(() => String, { nullable: true })
  dropType?: DropType;

  @Field(() => Number, { nullable: true })
  dropAmount?: number;

  @Field(() => Boolean, { nullable: true })
  draft?: boolean;

  @Field(() => Date, { nullable: true })
  mintStartDate?: Date;

  @Field(() => Date, { nullable: true })
  mintEndDate?: Date;
}
