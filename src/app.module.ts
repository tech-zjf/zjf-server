import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './database/db.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiInterceptor } from './core/interceptor/api.interceptor';
import { UserModule } from './modules/user/user.module';
import { TestModule } from './modules/test/test.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtMiddleware } from './core/middleware/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from './modules/auth/constant';
import { ArticleModule } from './modules/article/article.module';
import { CategoryModule } from './modules/category/category.module';
import { UploadModule } from './modules/upload/upload.module';
import * as express from 'express';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 全局环境变量
    TypeOrmModule.forRoot(dbConfig), //数据库
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: JWT_CONFIG.JWT_SECRET, // 秘钥
          signOptions: {
            expiresIn: JWT_CONFIG.JWT_EXPIRES_IN, // token 一年过期
          },
        };
      },
      inject: [ConfigService],
    }),
    TestModule,
    UserModule,
    AuthModule,
    ArticleModule,
    CategoryModule,
    UploadModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer) {
    consumer.apply(JwtMiddleware).forRoutes('*'); // 所有的路由都需要走中间件
  }
}
