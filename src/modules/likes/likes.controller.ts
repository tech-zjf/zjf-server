import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { LikesService } from './likes.service';
import { Uid } from '@/core/decorator/user.decorator';
import { AddLikeDto } from './dto/create-like.dto';
import { RemoveLikeDto } from './dto/remove-like.dto';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) {

    }

    @Post()
    async addLike(@Body() addLikeDto: AddLikeDto, @Uid() uid: number) {
        return this.likesService.addLike(addLikeDto, uid)
    }

    @Delete()
    async removeLike(@Query() removeLikeDto: RemoveLikeDto, @Uid() uid: number) {
        return this.likesService.removeLike(removeLikeDto, uid)
    }
}
