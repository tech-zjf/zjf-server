import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); //添加全局前缀
  app.use(cors()); // 配置跨域
  await app.listen(3008);
}
bootstrap();
