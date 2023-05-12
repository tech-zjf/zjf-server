import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async loginByPhone(@Body() loginDto: LoginDto) {
    return await this.authService.lginByPhone(loginDto);
  }
}
