import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Earning {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}


//amount: string;
//date: date;
