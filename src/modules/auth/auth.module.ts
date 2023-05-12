import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from './constant';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserDao } from '../user/user.dao';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: JWT_CONFIG.JWT_SECRET,
          signOptions: {
            expiresIn: JWT_CONFIG.JWT_EXPIRES_IN,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
