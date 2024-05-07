import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCollectionInput {
  @Field()
  userWalletAddress: string;

  @Field()
  contractSymbol: string;

  @Field()
  contractName: string;

  @Field()
  imageLogo: string;

  @Field()
  description: string;

  @Field(() => String)
  deploymentChain: string = 'Ethereum';
}
