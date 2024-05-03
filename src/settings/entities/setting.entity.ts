import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooSchema } from 'mongoose';

export enum SettingType {
  LIMITED,
  UNLIMITED,
}

@ObjectType()
@Schema()
export class Setting {
  @Field(() => String)
  @Prop()
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  paymentToken: string;

  @Field()
  @Prop({ enum: SettingType })
  settingType: SettingType;

  @Field(() => Number)
  @Prop()
  royalty: number;

  @Field(() => Boolean)
  @Prop()
  draft: boolean;

  @Field(() => Date)
  @Prop()
  mintStartDate: Date;

  @Field(() => Date)
  @Prop()
  mintEndDate: Date;
}
export type SettingDocument = Setting & Document;
export const SettingSchema = SchemaFactory.createForClass(Setting);

//enum SettingType {limited and unlimited}
//mint: start and end date
//royalty: percentage
// save as draft: boolean
