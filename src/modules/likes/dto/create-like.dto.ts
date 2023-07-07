import { IsNumber } from "class-validator";

export class AddLikeDto {
    @IsNumber()
    parentId: number;

    @IsNumber()
    relationType: number;

}