import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooSchema } from 'mongoose';
import { Withdrawal } from './withdrawals.entity';

@ObjectType()
@Schema()
export class Earning {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String, { nullable: true, defaultValue: '0.00' })
  @Prop()
  amountEarned: string;

  @Field(() => String, { nullable: true, defaultValue: '0.00' })
  @Prop()
  amountWithdrawn: string;

  @Field(() => String, { nullable: true, defaultValue: '0.00' })
  @Prop()
  currentBalance: string;

  @Field(() => String, { nullable: true })
  @Prop()
  paymentAddress: string;

  @Field(() => String)
  @Prop()
  collectionID: string;

  @Field(() => [Withdrawal])
  @Prop({
    type: [{ type: MongooSchema.Types.ObjectId, ref: () => Withdrawal }],
  })
  withdrawals: Withdrawal[];
}

export type EarningDocument = Earning & Document;
export const EarningSchema = SchemaFactory.createForClass(Earning);
