import { Module } from '@nestjs/common';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';
import { ViewsDao } from './views.dao';

@Module({
  controllers: [ViewsController],
  providers: [ViewsService, ViewsDao],
  exports: [ViewsService, ViewsDao]
})
export class ViewsModule { }
