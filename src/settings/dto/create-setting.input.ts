import { InputType, Int, Field } from '@nestjs/graphql';
import { SettingType } from '../entities/setting.entity';

@InputType()
export class CreateSettingInput {
  @Field(() => String)
  paymentToken: string;

  @Field(() => SettingType)
  collectionType: SettingType;

  @Field(() => Number)
  royalty: number;

  @Field(() => Boolean)
  draft: boolean;

  @Field(() => Date)
  mintStartDate: Date;

  @Field(() => Date)
  mintEndDate: Date;
}
