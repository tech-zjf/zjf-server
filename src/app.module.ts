import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './database/db.config';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiInterceptor } from './interceptor/api.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 全局环境变量
    TypeOrmModule.forRoot(dbConfig), //数据库
    TestModule, UserModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiInterceptor,
    },
  ],
})
export class AppModule {}
