import { HttpException, Injectable } from '@nestjs/common';
import { ViewsDao } from './views.dao';
import { CreateViewDto } from './dto/create-view.dto';
import { ApiCode } from '@/constant/api-code';
import { FindAllViewsDto } from './dto/find-all-views.dto';
import { BasicGetAllDto } from '@/core/dto/basic-get-all.dto';
import { PromiseTools } from '@/lib/tools/promise.tool';
import { ViewTypeMap } from './views.constant';
import { UserDao } from '../user/user.dao';
import { omit } from 'lodash'

@Injectable()
export class ViewsService {
    constructor(private readonly viewsDao: ViewsDao, private readonly userDao: UserDao,) { }

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
            const relationTypeStr = this.getViewTypeStr(item.relationType)
            const author = await this.userDao.findUser({ uid: +item.uid });
            return {
                ...omit(item, ['uid']),
                relationTypeStr,
                author,
                child: childViews,
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
            const relationTypeStr = this.getViewTypeStr(item.relationType)
            const author = await this.userDao.findUser({ uid: +item.uid });
            return {
                ...omit(item, ['uid']),
                relationTypeStr,
                author,
                child: childViews,
            }
        })
        return childList
    }

    getViewTypeStr(relationType: number) {
        if (ViewTypeMap.has(relationType)) {
            return ViewTypeMap.get(relationType)
        }
        throw new HttpException('该类型暂不支持评论', 200);
    }

}
