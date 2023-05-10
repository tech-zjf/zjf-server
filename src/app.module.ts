import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './database/db.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 全局环境变量
    TypeOrmModule.forRoot(dbConfig), //数据库
    TestModule,
  ],
})
export class AppModule {}
