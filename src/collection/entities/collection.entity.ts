import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Earning } from 'src/earnings/entities/earning.entity';
import { Setting } from 'src/settings/entities/setting.entity';

@ObjectType()
@Schema()
export class Collection {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  imageLogo: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => String)
  @Prop()
  creator: string;

  @Field(() => String)
  @Prop()
  contractAddress: string;

  // @Field(() => Setting)
  // @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: () => Setting }] })
  // setting: setting;

  @Field(() => Setting)
  @Prop({
    type: MongooSchema.Types.ObjectId,
    ref: 'Setting',
  })
  setting: Setting;

  @Field(() => Earning)
  @Prop({
    type: MongooSchema.Types.ObjectId,
    ref: 'Earning',
  })
  earning: Earning;

  @Field(() => String)
  @Prop()
  contractName: string;

  @Field(() => String)
  @Prop()
  contractSymbol: string;

  @Field(() => String)
  @Prop()
  deploymentChain: string;

  @Field(() => String)
  @Prop()
  categories: string[];

  @Field(() => String)
  @Prop()
  featuredImage: string;

  @Field(() => Boolean)
  @Prop()
  showRarity: boolean;

  @Field(() => Boolean)
  @Prop()
  isPublished: boolean;

  @Field(() => String)
  @Prop()
  creatorId: string;
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
