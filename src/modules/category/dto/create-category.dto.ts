import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(20)
  @MinLength(1)
  name: string;

  @IsString()
  @MaxLength(255)
  @MinLength(10)
  icon: string;
}
