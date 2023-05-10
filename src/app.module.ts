import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from 'database/db.config';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), TestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
