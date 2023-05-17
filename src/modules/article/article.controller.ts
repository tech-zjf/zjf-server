import { Uid } from '@/core/decorator/user.decorator';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { query } from 'express';
import { FindAllArticleDto } from './dto/find-all-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticle: CreateArticleDto, @Uid() uid: number) {
    return this.articleService.create(createArticle, uid);
  }
  @Get()
  findAll(@Query() query: FindAllArticleDto) {
    return this.articleService.findAll(query);
  }
}
