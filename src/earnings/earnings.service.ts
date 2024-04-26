import { Injectable } from '@nestjs/common';
import { CreateEarningInput } from './dto/create-earning.input';
import { UpdateEarningInput } from './dto/update-earning.input';

@Injectable()
export class EarningsService {
  create(createEarningInput: CreateEarningInput) {
    return 'This action adds a new earning';
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
