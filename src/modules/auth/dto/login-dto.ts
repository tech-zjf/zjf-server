import { IsPassportNumber, Length } from 'class-validator';

export class LoginDto {
  @IsPassportNumber('CN', { message: '手机号不正确' })
  @Length(11, 11, { message: '不是有效的手机号' })
  readonly phone: string;

  @Length(4, 4, { message: '请输入4位数字的验证码' })
  code: string;
}
