import { CategoryRelatedEntity } from '@/database/entities/category-related.entity';
import { CategoryEntity } from '@/database/entities/category.entity';
import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { EntityManager, Repository } from 'typeorm';

export class CategoryDao {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(CategoryRelatedEntity)
    private readonly categoryRelatedRepo: Repository<CategoryRelatedEntity>,
  ) {}

  /** 创建分类 */
  async create(createCategory, uid) {
    const insertCategory = this.categoryRepo.create({ ...createCategory, uid });
    const ret = await this.categoryRepo.insert(insertCategory);
    return ret.identifiers[0].id;
  }

  /** 根据id查找分类 */
  async findOneById(categoryId) {
    const categoryInfo = await this.categoryRepo.findOne({
      where: { id: categoryId },
      select: ['id', 'name', 'icon', 'createTime'],
    });
    if (!categoryInfo) {
      throw new HttpException('找不到该分类', 200);
    }
    return categoryInfo;
  }

  /** 获取分类列表 */
  async findAll() {
    const qb = this.categoryRepo.createQueryBuilder('category');
    return qb.getMany();
  }

  /** 分类关联内容 */
  async createCategoryRelated(
    { categoryId, contentType, contentId },
    transaction: EntityManager,
  ) {
    const insertCategoryRelated = this.categoryRelatedRepo.create({
      categoryId,
      contentType,
      contentId,
    });
    await transaction.insert(CategoryRelatedEntity, insertCategoryRelated);
  }

  /** 获取相关类容分类 */
  async findModuleCategory(contentType: string, contentId: string) {
    const data = await this.categoryRelatedRepo.findOne({
      contentType,
      contentId,
    });
    let categoryInfo = {};
    if (!data) {
      return categoryInfo;
    }
    categoryInfo = await this.findOneById(data?.categoryId);
    return categoryInfo;
  }
}
