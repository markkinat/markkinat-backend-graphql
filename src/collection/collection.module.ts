import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionResolver } from './collection.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from './entities/collection.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Collection.name, schema: CollectionSchema
    }]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  providers: [CollectionResolver, CollectionService],
})
export class CollectionModule {}
