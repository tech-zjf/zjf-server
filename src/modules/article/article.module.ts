import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@/database/entities/article.entity';
import { ArticleDao } from './article.dao';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    CategoryModule,
    UserModule,
    LikesModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleDao],
  exports: [ArticleService, ArticleDao],
})
export class ArticleModule { }
