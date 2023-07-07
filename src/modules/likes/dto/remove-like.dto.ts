import { IsString } from "class-validator";
import { AddLikeDto } from "./create-like.dto";

export class RemoveLikeDto {
    @IsString()
    parentId: number;

    @IsString()
    relationType: number;
}