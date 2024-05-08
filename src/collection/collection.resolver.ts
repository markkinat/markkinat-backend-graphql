import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CollectionService } from './collection.service';
import { Collection } from './entities/collection.entity';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { Schema as MongooSchema } from 'mongoose';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @Mutation(() => Collection)
  createCollection(
    @Args('createCollectionInput') createCollectionInput: CreateCollectionInput,
  ) {
    return this.collectionService.createCollection(createCollectionInput);
  }

  @Mutation(() => Collection)
  updateCollection(
    @Args('updateCollectionInput') updateCollectionInput: UpdateCollectionInput,
  ) {
    return this.collectionService.updateCollectionById(
      updateCollectionInput._id,
      updateCollectionInput,
    );
  }

  @Query(() => [Collection], { name: 'AllCollections' })
  findAll() {
    return this.collectionService.findAll();
  }

  @Query(() => Collection, { name: 'collection' })
  findOne(@Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId) {
    return this.collectionService.getCollectionById(id);
  }

  // get all collections by user id
  @Query(() => [Collection], { name: 'collectionsByUserID' })
  findAllByUserId(@Args('userId', { type: () => String }) userId: string) {
    return this.collectionService.getUserCollections(userId);
  }
  // get all collections by user wallet address
  @Query(() => [Collection], { name: 'collectionsByUserWalletAddress' })
  findAllByUserWalletAddress(
    @Args('walletAddress', { type: () => String }) walletAddress: string,
  ) {
    return this.collectionService.getUserCollectionsByWalletAddress(
      walletAddress,
    );
  }
}
