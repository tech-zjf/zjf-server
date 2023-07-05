import { Injectable } from '@nestjs/common';
import { ViewsDao } from './views.dao';
import { CreateViewDto } from './dto/create-view.dto';

@Injectable()
export class ViewsService {
    constructor(private readonly viewsDao: ViewsDao) { }

    async create(createViewDto: CreateViewDto, uid: string) {
        return '创建'
    }
}
