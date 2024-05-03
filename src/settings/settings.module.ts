import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsResolver } from './settings.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CollectionSchema } from 'src/collection/entities/collection.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Collection_Setting',
        schema: CollectionSchema,
      },
    ]),
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
  providers: [SettingsResolver, SettingsService],
})
export class SettingsModule {}
