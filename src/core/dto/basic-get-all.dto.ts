import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export enum OrderByEnum {
  CREATE_TIME = 'createTime',
}
export enum OrderEnum {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class BasicGetAllDto {
  @IsOptional() //是否必传
  @Type(() => Number) // 会进行类型转换，转成数字类型
  @IsInt()
  @Min(1)
  readonly page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(20)
  pageSize?: number = 10;

  @IsOptional()
  @IsEnum(OrderByEnum)
  readonly orderBy?: OrderByEnum = OrderByEnum.CREATE_TIME;

  @IsOptional()
  @IsEnum(OrderEnum)
  readonly order?: OrderEnum = OrderEnum.DESC;
}
