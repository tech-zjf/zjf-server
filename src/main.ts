import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api'); //添加全局前缀
  app.use(cors()); // 配置跨域
  app.useStaticAssets('public');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true })); // 开启一个全局验证管道，否则class-validator无效
  await app.listen(3008);
}
bootstrap();
