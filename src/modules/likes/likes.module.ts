import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikesDao } from './likes.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikesEntity } from '@/database/entities/likes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikesEntity])
  ],
  controllers: [LikesController],
  providers: [LikesService, LikesDao],
  exports: [LikesService, LikesDao]
})
export class LikesModule { }
