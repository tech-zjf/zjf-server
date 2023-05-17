import { Injectable } from '@nestjs/common';
import { ArticleDao } from './article.dao';
import { CreateArticleDto } from './dto/create-article.dto';
import { getConnection } from 'typeorm';
import { CategoryDao } from '../category/category.dao';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleDao: ArticleDao,
    private readonly categoryDao: CategoryDao,
  ) {}

  /** 创建文章 */
  async create(createArticle: CreateArticleDto, uid: number) {
    let articleId;
    try {
      await getConnection().transaction(async (transactionalEntityManager) => {
        articleId = await this.articleDao.create(
          createArticle,
          uid,
          transactionalEntityManager,
        );
        await this.categoryDao.createCategoryRelated(
          {
            categoryId: createArticle.categoryId,
            contentType: 'article',
            contentId: articleId,
          },
          transactionalEntityManager,
        );
      });
    } catch (error) {}
    return { articleId };
  }
}
