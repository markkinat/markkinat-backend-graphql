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

  create(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    createdUser.email = createUserInput.walletAddress;
    return createdUser.save();
  }
  createUser(walletAddress: string) {
    const createdUser = new this.userModel({
      walletAddress: walletAddress,
    });

    return createdUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  async getUserById(id: MongooSchema.Types.ObjectId) {
    return this.userModel.findById(id);
  }

  async getUserByWalletAddress(address: string) {
    console.log('address', address);

    console.log(
      'this.userModelEMAIL',
      await this.userModel.findOne({
        email: address,
      }),
    );

    console.log(
      'this.userModel',
      await this.userModel.findOne({
        walletAddress: address,
      }),
    );
    return this.userModel.findOne({
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

  remove(id: MongooSchema.Types.ObjectId) {
    return this.userModel.deleteOne({
      _id: id,
    });
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
}
