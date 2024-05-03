import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model, Schema as MongooSchema } from 'mongoose';
import { Collection } from 'src/collection/entities/collection.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  createUser(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  async getUserById(id: MongooSchema.Types.ObjectId) {
    return await this.userModel.findById(id);
  }

  async getUserByWalletAddress(address: string): Promise<User> {
    return await this.userModel.findOne({
      walletAddress: address,
    });
  }

  updateUser(
    id: MongooSchema.Types.ObjectId,
    updateUserInput: UpdateUserInput,
  ) {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        $set: updateUserInput,
      },
      {
        new: true,
      },
    );
  }

  async updateUserCollections(id: string, newCollections: Collection[]) {
    return this.userModel.findOneAndUpdate(
      { walletAddress: id },
      {
        $set: { ['userCollections']: newCollections },
      },
      {
        new: true,
      },
    );
  }

  // deleteUserAccount(address: string) {
  //   this.userModel.deleteOne({
  //     walletAddress: address
  //   });
  // }

  // remove(id: MongooSchema.Types.ObjectId) {
  //   return this.userModel.deleteOne({
  //     _id: id,
  //   });
  // }
}
