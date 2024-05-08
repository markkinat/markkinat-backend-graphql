import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEarningInput {
  @Field(() => String)
  collectionID: string;
}
