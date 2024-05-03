import { InputType, Int, Field } from '@nestjs/graphql';
import { SettingType } from '../entities/setting.entity';

@InputType()
export class CreateSettingInput {
  @Field(() => String)
  paymentToken: string = 'ETH';

  @Field(() => SettingType)
  settingType: SettingType = SettingType.UNLIMITED;

  @Field(() => Number)
  royalty: number = 2;

  @Field(() => Boolean)
  draft: boolean = false;

  @Field(() => Date)
  mintStartDate: Date;

  @Field(() => Date)
  mintEndDate: Date;
}
