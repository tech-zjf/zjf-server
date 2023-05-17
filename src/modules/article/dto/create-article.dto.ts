import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @MaxLength(20)
  @MinLength(5)
  title: string;

  @IsString()
  @MaxLength(10000)
  @MinLength(50)
  content: string;

  @IsString()
  poster: string;

  @IsNumber()
  categoryId: number;
}
