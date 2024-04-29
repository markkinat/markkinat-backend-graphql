import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Schema as MongooSchema } from 'mongoose';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'getUserById' })
  getUserById(
    @Args('id', { type: () => MongooSchema.Types.ObjectId }) id: MongooSchema.Types.ObjectId
  ) {
    return this.userService.getUserById(id);
  }

  @Query(() => User, {
    name: 'userByWalletAddress',
    description: 'Find user by wallet address',
  })
  async getUserByWallet(@Args('address', { type: () => String }) address: string) {
    return await this.userService.getUserByWalletAddress(address);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput._id, updateUserInput);
  }

  // @Mutation(() => User)
  // removeUser(
  //   @Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId,
  // ) {
  //   return this.userService.remove(id);
  // }
}
