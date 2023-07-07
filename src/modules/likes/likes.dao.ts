import { LikesEntity } from "@/database/entities/likes.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddLikeDto } from "./dto/create-like.dto";
import { RemoveLikeDto } from "./dto/remove-like.dto";

export class LikesDao {
    constructor(@InjectRepository(LikesEntity) private readonly likesRepo: Repository<LikesEntity>) { }

    async addLike(addLikeDto: AddLikeDto, uid: number) {
        const insertLike = this.likesRepo.create({ ...addLikeDto, uid })
        await this.likesRepo.insert(insertLike)
        return 'ok'
    }

    async removeLike(removeLikeDto: RemoveLikeDto, uid: number) {
        const ret = await this.likesRepo.findOne({ ...removeLikeDto, uid });
        if (ret) {
            await this.likesRepo.delete(ret.id);
            return 'ok'
        }
    }

    async findLikes(parentId, relationType) {
        const qb = this.likesRepo
            .createQueryBuilder('like')
            .where('like.parentId = :parentId ', { parentId })
            .andWhere('like.relationType = :relationType', { relationType })
        return qb.getMany();
    }
}