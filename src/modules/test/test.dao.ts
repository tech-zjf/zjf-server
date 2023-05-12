import { TestEntity } from '@/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
@Injectable()
export class TestDao {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>,
  ) {}

  async create(transaction: EntityManager, test) {
    const insertTest = this.testRepository.create(test);
    const ret = await transaction.insert(TestEntity, insertTest);
    return ret.identifiers[0].id;
  }
}
