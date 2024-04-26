import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEarningInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
