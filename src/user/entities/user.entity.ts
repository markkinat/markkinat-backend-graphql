import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collection } from 'src/collection/entities/collection.entity';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  // Add user properties
  @Field(() => String, { nullable: true })
  @Prop()
  name: string;

  @Field(() => String, { nullable: true })
  @Prop({ unique: true })
  email: string;

  @Field(() => String)
  @Prop()
  walletAddress: string;

  @Field(() => [Collection])
  @Prop({
    type: [{ type: MongooSchema.Types.ObjectId, ref: () => Collection }],
  })
  userCollections: Collection[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
