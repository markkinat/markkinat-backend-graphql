import { Module } from '@nestjs/common';
import { EarningsService } from './earnings.service';
import { EarningsResolver } from './earnings.resolver';

@Module({
  providers: [EarningsResolver, EarningsService],
})
export class EarningsModule {}
