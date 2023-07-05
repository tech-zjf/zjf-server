import { Module } from '@nestjs/common';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';
import { ViewsDao } from './views.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewsEntity } from '@/database/entities/views.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ViewsEntity]),
    UserModule
  ],
  controllers: [ViewsController],
  providers: [ViewsService, ViewsDao],
  exports: [ViewsService, ViewsDao]
})
export class ViewsModule { }
