import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { UserService } from '@/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async lginByPhone(loginDto: LoginDto) {
    const { phone, code } = loginDto;
    const payload = { sub: 2 };
    return {
      user: {
        uid: 2,
        nickname: 'tech-zjf',
        phone,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}
