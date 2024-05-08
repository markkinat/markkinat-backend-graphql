import { Injectable } from '@nestjs/common';
import { CreateEarningInput } from './dto/create-earning.input';
import { UpdateEarningInput } from './dto/update-earning.input';
import { Earning } from './entities/earning.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooSchema } from 'mongoose';
import { Withdrawal } from './entities/withdrawals.entity';

@Injectable()
export class EarningsService {
  constructor(
    @InjectModel(Earning.name) private earningsModel: Model<Earning>,
    @InjectModel(Withdrawal.name)
    private withdrawalsModel: Model<Withdrawal>,
  ) {}
  async createEarnings(
    createEarningInput: CreateEarningInput,
  ): Promise<Earning> {
    try {
      const createdEarning = new this.earningsModel(createEarningInput);
      return createdEarning.save();
    } catch (error) {
      throw new Error(error);
    }
    // return 'This action adds a new earning';
  }

  findAll() {
    return `This action returns all earnings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} earning`;
  }

  update(id: number, updateEarningInput: UpdateEarningInput) {
    return `This action updates a #${id} earning`;
  }

  remove(id: number) {
    return `This action removes a #${id} earning`;
  }
}
