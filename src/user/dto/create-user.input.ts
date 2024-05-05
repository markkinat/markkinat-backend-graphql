import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  walletAddress: string;

  @Field(() => String)
  image?: string;
}
