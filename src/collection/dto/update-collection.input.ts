import { CreateCollectionInput } from './create-collection.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooSchema } from 'mongoose';

@InputType()
export class UpdateCollectionInput extends PartialType(CreateCollectionInput) {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  name?: string;

  @Field(() => String)
  imageLogo?: string;

  @Field(() => String)
  description?: string;

  @Field(() => String)
  contractAddress?: string;

  @Field(() => String)
  featuredImage?: string;

  @Field(() => String)
  urlIdentifier?: string;

  @Field(() => Boolean)
  showRarity?: boolean;

  @Field(() => [String])
  categories?: string[];
}
