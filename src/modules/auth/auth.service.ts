import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor() {}

  async lginByPhone(loginDto: LoginDto) {
    const { phone, code } = loginDto;
  }
}
