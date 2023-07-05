import { ViewsEntity } from "@/database/entities/views.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateViewDto } from "./dto/create-view.dto";
import { FindAllViewsDto } from "./dto/find-all-views.dto";
import { ViewTypeEnum } from "./views.constant";

export class ViewsDao {
    constructor(@InjectRepository(ViewsEntity) private readonly viewRepo: Repository<ViewsEntity>) { }

    async create(createViewDto: CreateViewDto, uid: number) {
        const insertView = this.viewRepo.create({ ...createViewDto, uid })
        const ret = await this.viewRepo.insert(insertView)
        return ret.identifiers[0].id
    }

    async findAll(query: FindAllViewsDto) {
        const qb = this.viewRepo
            .createQueryBuilder('view')
            .where('view.parentId = :parentId ', { parentId: query.parentId })
            .andWhere('view.relationType = :relationType', { relationType: query.relationType })
            .take(query.pageSize)
            .skip((query.page - 1) * query.pageSize)
            .orderBy('view.createTime', query.order);
        return qb.getMany();
    }

    async findChildViews(viewId, query) {
        const qb = this.viewRepo
            .createQueryBuilder('view')
            .where('view.parentId = :parentId ', { parentId: viewId })
            .andWhere('view.relationType = :relationType', { relationType: ViewTypeEnum.VIEW })
            .take(query.pageSize)
            .skip((query.page - 1) * query.pageSize)
            .orderBy('view.createTime', query.order);
        return qb.getMany()
    }

}
