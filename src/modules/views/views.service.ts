import { HttpException, Injectable } from '@nestjs/common';
import { ViewsDao } from './views.dao';
import { CreateViewDto } from './dto/create-view.dto';
import { ApiCode } from '@/constant/api-code';
import { FindAllViewsDto } from './dto/find-all-views.dto';
import { BasicGetAllDto } from '@/core/dto/basic-get-all.dto';
import { PromiseTools } from '@/lib/tools/promise.tool';

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

    /** 
     * 获取评论列表
     */
    async findAll(query: FindAllViewsDto) {
        const views = await this.viewsDao.findAll(query)
        const list = await PromiseTools.queue(views, async (item) => {
            const childViews = await this.findChildViews(item.id, { page: 1, pageSize: 2 })
            return {
                ...item,
                child: childViews
            }
        })
        return { list }
    }

    /** 
     * 递归获取子评论列表 
     */
    async findChildViews(viewId, query: BasicGetAllDto) {
        const views = await this.viewsDao.findChildViews(viewId, query)
        const childList = await PromiseTools.queue(views, async (item) => {
            const childViews = await this.findChildViews(item.id, { page: 1, pageSize: 1000 })
            return {
                ...item,
                child: childViews
            }
        })
        return childList
    }

}
