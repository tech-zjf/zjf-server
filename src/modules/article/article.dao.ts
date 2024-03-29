import { ArticleEntity } from '@/database/entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { log } from 'console';
import { FindAllArticleDto } from './dto/find-all-article.dto';
import { HttpException } from '@nestjs/common';

export class ArticleDao {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepo: Repository<ArticleEntity>,
  ) { }

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

  /** 查找文章列表 */
  async findAll(query: FindAllArticleDto) {
    const qb = this.articleRepo
      .createQueryBuilder('article')
      .take(query.pageSize)
      .skip((query.page - 1) * query.pageSize)
      .orderBy('article.createTime', query.order);
    return qb.getMany();
  }

  async findOneById(id: string) {
    const articleInfo = await this.articleRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    if (!articleInfo) {
      throw new HttpException('文章不存在', 404);
    }
    return articleInfo;
  }
}
