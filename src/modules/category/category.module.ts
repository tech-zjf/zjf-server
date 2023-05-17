import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '@/database/entities/category.entity';
import { CategoryDao } from './category.dao';
import { CategoryRelatedEntity } from '@/database/entities/category-related.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, CategoryRelatedEntity])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryDao],
  exports: [CategoryService, CategoryDao],
})
export class CategoryModule {}
