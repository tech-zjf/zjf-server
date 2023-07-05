import { BasicGetAllDto } from "@/core/dto/basic-get-all.dto";
import { IsNumber, IsNumberString } from "class-validator";

export class FindAllViewsDto extends BasicGetAllDto {
    @IsNumberString()
    parentId: number;

    @IsNumberString()
    relationType: number;
}