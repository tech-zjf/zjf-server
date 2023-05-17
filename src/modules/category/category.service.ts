import { Injectable } from '@nestjs/common';
import { CategoryDao } from './category.dao';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryDao: CategoryDao) {}
  async create(createCategory, uid) {
    const categoryId = await this.categoryDao.create(createCategory, uid);
    return { categoryId };
  }
}
