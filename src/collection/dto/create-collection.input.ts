import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCollectionInput {

  @Field()
  userWalletAddress: string;
  
  @Field()
  name: string;

  @Field()
  image: string;

  @Field()
  description: string;

  @Field()
  userId: string;

  @Field()
  contractAddress: string;
}