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

  @Query(() => [Collection], { name: 'collection' })
  findAll() {
    return this.collectionService.findAll();
  }

  @Query(() => Collection, { name: 'collection' })
  findOne(@Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId) {
    return this.collectionService.getCollectionById(id);
  }

  @Mutation(() => Collection)
  updateCollection(
    @Args('updateCollectionInput') updateCollectionInput: UpdateCollectionInput,
  ) {
    return this.collectionService.updateCollectionById(
      updateCollectionInput.id,
      updateCollectionInput,
    );
  }

  // @Mutation(() => Collection)
  // addCollaboratorToCollection(
  //   @Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId,
  //   @Args('collaboratorId') collaboratorId: string,
  //   @Args('adminAddress') adminAddress: string,
  // ) {
  //   return this.collectionService.addCollaborator(
  //     id,
  //     collaboratorId,
  //     adminAddress,
  //   );
  // }

  // @Mutation(() => Collection)
  // removeCollaboratorFromCollection(
  //   @Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId,
  //   @Args('collaboratorId') collaboratorId: string,
  //   @Args('adminAddress') adminAddress: string,
  // ) {
  //   return this.collectionService.removeCollaborator(
  //     id,
  //     collaboratorId,
  //     adminAddress,
  //   );
  // }

  // @Mutation(() => Collection)
  // removeCollection(@Args('id', { type: () => String }) id: MongooSchema.Types.ObjectId) {
  //   return this.collectionService.removeCollection(id);
  // }
}
