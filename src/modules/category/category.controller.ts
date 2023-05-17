import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Uid } from '@/core/decorator/user.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  create(@Body() createCategory: CreateCategoryDto, @Uid() uid: string) {
    return this.categoryService.create(createCategory, uid);
  }
}
