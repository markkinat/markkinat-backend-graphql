import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooSchema } from 'mongoose';
@ObjectType()
export class Withdrawal {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  amount: string;

  @Field(() => Date)
  @Prop()
  date: Date;

  @Field(() => String)
  @Prop()
  paymentAddress: string;

  @Field(() => String)
  @Prop()
  collectionID: string;
}

export type WithdrawalDocument = Withdrawal & Document;
export const WithdrawalSchema = SchemaFactory.createForClass(Withdrawal);

//amount: string;
//date: date;
