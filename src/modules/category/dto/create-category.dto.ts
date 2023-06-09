import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(20, { message: '最大限制为20' })
  @MinLength(1, { message: '最少限制为1' })
  name: string;

  @IsString()
  @MaxLength(255, { message: '最大限制为255' })
  @MinLength(10, { message: '最少限制为10' })
  icon: string;
}
