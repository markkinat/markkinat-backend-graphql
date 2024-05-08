import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EarningsService } from './earnings.service';
import { Earning } from './entities/earning.entity';
import { CreateEarningInput } from './dto/create-earning.input';
import { UpdateEarningInput } from './dto/update-earning.input';
import { Schema as MongooSchema } from 'mongoose';


@Resolver(() => Earning)
export class EarningsResolver {
  constructor(private readonly earningsService: EarningsService) {}

  @Query(() => [Earning], { name: 'earnings' })
  findAll() {
    return this.earningsService.findAll();
  }

  @Query(() => Earning, { name: 'earning' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.earningsService.findOne(id);
  }

  // get user collection earnings
  @Query(() => [Earning], { name: 'userCollectionEarnings' })
  getUserCollectionEarnings(
    @Args('collectionID', { type: () => String }) collectionID: string,
  ) {
    return this.earningsService.getUserCollectionEarnings(collectionID);
  }

  @Mutation(() => Earning)
  removeEarning(@Args('id', { type: () => Int }) id: number) {
    return this.earningsService.remove(id);
  }

  //update user earnings payment address
  @Mutation(() => Earning)
  updateUserPaymentAddress(
    @Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId,

    @Args('paymentAddress', { type: () => String }) paymentAddress: string,
  ) {
    return this.earningsService.updateUserPaymentAddress(id, paymentAddress);
  }
}
