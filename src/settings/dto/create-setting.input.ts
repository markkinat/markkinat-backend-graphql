import { InputType, Int, Field } from '@nestjs/graphql';
import { DropType } from '../entities/setting.entity';

@InputType()
export class CreateSettingInput {
  @Field(() => String)
  paymentToken: string = 'ETH';

  @Field(() => String)
  dropType: DropType = DropType.OPEN;

  @Field(() => Boolean)
  draft: boolean = true;

  @Field(() => String)
  collectionID: string;
}
