import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ViewsService } from './views.service';
import { Uid } from '@/core/decorator/user.decorator';
import { CreateViewDto } from './dto/create-view.dto';
import { FindAllViewsDto } from './dto/find-all-views.dto';

@Controller('views')
export class ViewsController {
    constructor(private readonly viewsService: ViewsService) { }


    @Post()
    create(@Body() createViewDto: CreateViewDto, @Uid() uid: number) {
        return this.viewsService.create(createViewDto, uid)
    }

    @Get()
    findAll(@Query() query: FindAllViewsDto) {
        return this.viewsService.findAll(query);
    }

}
