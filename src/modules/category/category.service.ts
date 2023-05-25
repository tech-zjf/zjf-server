import { Injectable } from '@nestjs/common';
import { CategoryDao } from './category.dao';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryDao: CategoryDao) {}

  /**
   * 创建分类
   */
  async create(createCategory, uid) {
    const categoryId = await this.categoryDao.create(createCategory, uid);
    return { categoryId };
  }

  /**
   * 根据id获取分类
   */
  async findOneById(id: string) {
    return await this.categoryDao.findOneById(id);
  }
}
