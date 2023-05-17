import { CategoryRelatedEntity } from '@/database/entities/category-related.entity';
import { CategoryEntity } from '@/database/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
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
}
