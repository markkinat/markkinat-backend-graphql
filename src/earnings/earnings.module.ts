import { Global, Module } from '@nestjs/common';
import { EarningsService } from './earnings.service';
import { EarningsResolver } from './earnings.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Earning, EarningSchema } from './entities/earning.entity';
import { Withdrawal, WithdrawalSchema } from './entities/withdrawals.entity';


@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Earning.name,
        schema: EarningSchema,
      },
      {
        name: Withdrawal.name,
        schema: WithdrawalSchema,
      },
    ]),
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
  providers: [EarningsResolver, EarningsService],
  exports: [EarningsService],
})
export class EarningsModule {}
