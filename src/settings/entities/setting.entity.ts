import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooSchema } from 'mongoose';

export enum DropType {
  LIMITED,
  OPEN,
}

@ObjectType()
@Schema()
export class Setting {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  paymentToken: string;

  @Field(() => String)
  @Prop()
  dropType: DropType;

  @Field(() => Int, { nullable: true })
  @Prop()
  dropAmount: number;

  @Field(() => Boolean, { defaultValue: true })
  @Prop()
  draft: boolean;

  @Field(() => Date, { nullable: true })
  @Prop()
  mintStartDate: Date;

  @Field(() => Date, { nullable: true })
  @Prop()
  mintEndDate: Date;

  @Field(() => String)
  @Prop()
  collectionID: string;
}
export type SettingDocument = Setting & Document;
export const SettingSchema = SchemaFactory.createForClass(Setting);

//enum SettingType {limited and unlimited}
//mint: start and end date
//royalty: percentage
// save as draft: boolean
