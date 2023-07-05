import { Body, Controller, Post } from '@nestjs/common';
import { ViewsService } from './views.service';
import { Uid } from '@/core/decorator/user.decorator';
import { CreateViewDto } from './dto/create-view.dto';

@Controller('views')
export class ViewsController {
    constructor(private readonly viewsService: ViewsService) {

    }
    @Post()
    create(@Body() createViewDto: CreateViewDto, @Uid() uid: string) {
        return this.viewsService.create(createViewDto, uid)
    }
}
