import { IsNumberString, IsString, Length, MaxLength, MinLength, isNumberString, } from "class-validator";

export class CreateViewDto {
    @IsNumberString()
    @Length(0, 100)
    parentViewId

    @IsString({ message: '字符串类型' })
    @MaxLength(200, { message: '最多200字' })
    @MinLength(1, { message: '最少一个字' })
    content: string
}