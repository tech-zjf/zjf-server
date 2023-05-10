import { Injectable } from '@nestjs/common';
import { TestDao } from './test.dao';
import { getConnection } from 'typeorm';

@Injectable()
export class TestService {
  constructor(private readonly testDao: TestDao) {}
  async create(createTestDto: any) {
    let testId;
    try {
      await getConnection().transaction(async (transactionalEntityManager) => {
        testId = await this.testDao.create(
          transactionalEntityManager,
          createTestDto,
        );
      });
      return testId;
    } catch (error) {}
  }
}
