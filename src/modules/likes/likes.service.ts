import { HttpException, Injectable } from '@nestjs/common';
import { LikesDao } from './likes.dao';
import { AddLikeDto } from './dto/create-like.dto';
import { RemoveLikeDto } from './dto/remove-like.dto';

@Injectable()
export class LikesService {
    constructor(private readonly likesDao: LikesDao) {

    }

    async addLike(addLikeDto: AddLikeDto, uid: number) {
        if (!uid) {
            throw new HttpException('用户未登录', 403)
        }
        try {
            this.likesDao.addLike(addLikeDto, uid)
        } catch (error) {
            throw new HttpException('系统错误', 520)
        }
    }

    async removeLike(removeLikeDto: RemoveLikeDto, uid: number) {
        if (!uid) {
            throw new HttpException('用户未登录', 403)
        }
        try {
            this.likesDao.removeLike(removeLikeDto, uid)
        } catch (error) {
            throw new HttpException('系统错误', 520)
        }
    }
}
