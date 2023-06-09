import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString({ message: '字符串类型' })
  @MaxLength(20, { message: '最大限制为20' })
  @MinLength(5, { message: '最少限制为5' })
  title: string;

  @IsString()
  @MaxLength(10000, { message: '最大限制为10000' })
  @MinLength(50, { message: '最少限制为50' })
  content: string;

  @IsString()
  poster: string;

  @IsNumber()
  categoryId: number;
}
