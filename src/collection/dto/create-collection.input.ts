import { Optional } from '@nestjs/common';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCollectionInput {
  @Field(() => String)
  userWalletAddress: string;

  @Field(() => String)
  contractSymbol: string;

  @Field(() => String)
  contractName: string;

  @Field(() => String)
  imageLogo: string;

  @Field(() => String)
  description: string;
}
