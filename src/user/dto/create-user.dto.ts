import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UserGender } from '../user.constant';
import { IsPhone } from '@/core/validator/is-phone.validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  nickname: string;

  @IsString()
  @MaxLength(255)
  wechatAvatarUrl: string;

  @IsOptional()
  gender?: UserGender = UserGender.MALE;

  @IsPhone()
  phone: string;
}
