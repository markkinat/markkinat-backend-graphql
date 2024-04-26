import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model, Schema as MongooSchema } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  getUserById(id: MongooSchema.Types.ObjectId) {
    return this.userModel.findById(id);
  }

  getUserByWalletAddress(address: string) {
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
}
