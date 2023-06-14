import { HttpException, Injectable } from '@nestjs/common';
import { ArticleDao } from './article.dao';
import { CreateArticleDto } from './dto/create-article.dto';
import { getConnection } from 'typeorm';
import { CategoryDao } from '../category/category.dao';
import { PromiseTools } from '@/lib/tools/promise.tool';
import { FindAllArticleDto } from './dto/find-all-article.dto';
import { UserDao } from '../user/user.dao';
import { ApiCode } from '@/constant/api-code';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleDao: ArticleDao,
    private readonly categoryDao: CategoryDao,
    private readonly userDao: UserDao,
  ) {}

  /**
   * 创建文章
   */
  async create(createArticle: CreateArticleDto, uid: number) {
    if (!uid) {
      throw new HttpException(ApiCode.NOT_LOGIN.msg, +ApiCode.NOT_LOGIN.code);
    }
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
      return { articleId };
    } catch (error) {
      throw new HttpException(ApiCode.FAIL.msg, +ApiCode.FAIL.code);
    }
  }

  /**
   * 获取文章列表
   */
  async findAll(query: FindAllArticleDto) {
    let articleList = await this.articleDao.findAll(query);
    return PromiseTools.queue(articleList, async (item) => {
      const category = await this.categoryDao.findModuleCategory(
        'article',
        `${item.id}`,
      );
      const author = await this.userDao.findUser({ uid: +item.uid });
      return {
        ...item,
        type: 'article',
        category,
        author,
      };
    });
  }

  /** 文章详情 */
  async findOneById(id: string) {
    let articleInfo: any = await this.articleDao.findOneById(id);
    const category = await this.categoryDao.findModuleCategory(
      'article',
      `${articleInfo.id}`,
    );
    const author = await this.userDao.findUser({ uid: +articleInfo.uid });
    articleInfo = {
      ...articleInfo,
      category,
      author,
    };
    return articleInfo;
  }
}
