import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EarningsService } from './earnings.service';
import { Earning } from './entities/earning.entity';
import { CreateEarningInput } from './dto/create-earning.input';
import { UpdateEarningInput } from './dto/update-earning.input';

@Resolver(() => Earning)
export class EarningsResolver {
  constructor(private readonly earningsService: EarningsService) {}

  @Mutation(() => Earning)
  createEarning(@Args('createEarningInput') createEarningInput: CreateEarningInput) {
    return this.earningsService.create(createEarningInput);
  }

  @Query(() => [Earning], { name: 'earnings' })
  findAll() {
    return this.earningsService.findAll();
  }

  @Query(() => Earning, { name: 'earning' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.earningsService.findOne(id);
  }

  @Mutation(() => Earning)
  updateEarning(@Args('updateEarningInput') updateEarningInput: UpdateEarningInput) {
    return this.earningsService.update(updateEarningInput.id, updateEarningInput);
  }

  @Mutation(() => Earning)
  removeEarning(@Args('id', { type: () => Int }) id: number) {
    return this.earningsService.remove(id);
  }
}
