import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { rootMongooseTestModule } from 'src/common/helpers/mongoose.helper';

@Global()
@Module({
  imports: [
    rootMongooseTestModule(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
  providers: [UserResolver, UserService, ConfigService],
  exports: [UserService],
})
export class UserModule {}
