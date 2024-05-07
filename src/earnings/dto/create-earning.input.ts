import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEarningInput {
  @Field(() => String)
  amountEarned: string = '0.00';
  @Field(() => String)
  amountWithdrawn: string = '0.00';
  @Field(() => String)
  currentBalance: string = '0.00';

  @Field(() => String)
  collectionID: string;
}
