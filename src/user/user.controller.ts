import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { Schema as MongooSchema } from 'mongoose';
import { UpdateUserInput } from './dto/update-user.input';

@Controller('user')
export class UserController {
  constructor(private userServices: UserService) {}

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserInput: CreateUserInput) {
    return this.userServices.createUser(createUserInput);
  }

  @Get()
  @HttpCode(200)
  async getUser(@Param('id') id: MongooSchema.Types.ObjectId) {
    return await this.userServices.getUserById(id);
  }

  @Get('/address')
  @HttpCode(200)
  async getUserByWalletAddress(@Param('address') address: string) {
    return await this.userServices.getUserByWalletAddress(address);
  }

  @Put('/user')
  @HttpCode(200)
  async updateUserById(@Body() updateUserInput: UpdateUserInput) {
    return await this.updateUserById(updateUserInput);
  }
}
