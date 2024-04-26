import { CreateEarningInput } from './create-earning.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEarningInput extends PartialType(CreateEarningInput) {
  @Field(() => Int)
  id: number;
}
