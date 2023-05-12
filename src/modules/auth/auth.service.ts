import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { UserService } from '@/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDao } from '../user/user.dao';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /** 手机号登录 */
  async lginByPhone(loginDto: LoginDto) {
    const { phone } = loginDto;
    let user = await this.userService.findOneByPhone(phone);
    if (!user) {
      const uid = await this.userService.createUserByPhone(phone);
      user = await this.userService.findUser({ uid });
    }
    const payload = { sub: user.uid };
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
