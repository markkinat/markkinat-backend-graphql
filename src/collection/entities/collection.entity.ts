import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Setting } from 'src/settings/entities/setting.entity';

@ObjectType()
@Schema()
export class Collection {

    @Field(() => String)
    _id: MongooSchema.Types.ObjectId;

    @Field(() => String)
    @Prop()
    name: string;

    @Field(() => String)
    @Prop()
    image: string;

    @Field(() => String)
    @Prop()
    description: string;

    @Field(() => String)
    @Prop()
    creator: MongooSchema.Types.ObjectId;

    @Field(() => String)
    @Prop()
    contractAddress: String;

    @Field(() => String)
    @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: 'Collection' }], cascade: true })
    setting: string;

    @Field(() => String)
    @Prop()
    contractName: string;

    @Field(() => String)
    @Prop()
    contractSymbol: string;

    @Field(() => String)
    @Prop()
    categories: [string];

    @Field(() => String)
    @Prop()
    featuredImage: [string];

    @Field(() => Boolean)
    @Prop()
    rarity: boolean;
}
export type CollectionDocument = Collection & Document;
export const CollectionSchema = SchemaFactory.createForClass(Collection);


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