import { Uid } from '@/core/decorator/user.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticle: CreateArticleDto, @Uid() uid: number) {
    return this.articleService.create(createArticle, uid);
  }
}
