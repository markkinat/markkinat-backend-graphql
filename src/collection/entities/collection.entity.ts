import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Collection {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}



//name: string;
//description: string;
//image: string;
// contract: name;
// contractAddress: string;
// categories: string;
// tags: string;
// payment token;
// featuredImage: string;
// show rarity: boolean;
// creator: user Id