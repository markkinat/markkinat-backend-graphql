import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Setting {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}


//enum SettingType {limited and unlimited}
//mint: start and end date
//royalty: percentage
// save as draft: boolean

