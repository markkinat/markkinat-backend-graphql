import { CreateCollectionInput } from './create-collection.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooSchema } from 'mongoose';

@InputType()
export class UpdateCollectionInput extends PartialType(CreateCollectionInput) {

  @Field()
  id: MongooSchema.Types.ObjectId;
  @Field()
  name?: string;

  @Field()
  image?: string;

  @Field()
  description?: string;
}