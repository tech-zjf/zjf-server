import { HttpException, Injectable } from '@nestjs/common';
import { ViewsDao } from './views.dao';
import { CreateViewDto } from './dto/create-view.dto';
import { ApiCode } from '@/constant/api-code';
import { FindAllViewsDto } from './dto/find-all-views.dto';

@Injectable()
export class ViewsService {
    constructor(private readonly viewsDao: ViewsDao) { }

    /**
     * 评论创建
     */
    async create(createViewDto: CreateViewDto, uid: number) {
        if (!uid) {
            throw new HttpException(ApiCode.NOT_LOGIN.msg, +ApiCode.NOT_LOGIN.code);
        }
        try {
            const viewId = await this.viewsDao.create(createViewDto, uid)
            return { viewId }
        } catch (error) {
            throw new HttpException(ApiCode.FAIL.msg, +ApiCode.FAIL.code);
        }
    }

    async findAll(query: FindAllViewsDto) {
        const list = await this.viewsDao.findAll(query)
        return { list }
    }
}
