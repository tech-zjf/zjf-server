import { Module } from '@nestjs/common';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';
import { ViewsDao } from './views.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewsEntity } from '@/database/entities/views.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ViewsEntity])
  ],
  controllers: [ViewsController],
  providers: [ViewsService, ViewsDao],
  exports: [ViewsService, ViewsDao]
})
export class ViewsModule { }
