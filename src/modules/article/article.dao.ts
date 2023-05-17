import { ArticleEntity } from '@/database/entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { log } from 'console';

export class ArticleDao {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepo: Repository<ArticleEntity>,
  ) {}

  /** 创建文章 */
  async create(
    createArticle: CreateArticleDto,
    uid: number,
    transaction: EntityManager,
  ) {
    const insertArticle = this.articleRepo.create({ ...createArticle, uid });
    const ret = await transaction.insert(ArticleEntity, insertArticle);
    return ret.identifiers[0].id;
  }
}
