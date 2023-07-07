import { LikeTypeEnum } from "@/modules/likes/likes.constant";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('likes')
export class LikesEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: '主键id',
        unsigned: true
    })
    id: number

    @Column('bigint', { name: 'uid', comment: '作者id' })
    uid: number;

    @Column({
        type: "enum",
        enum: LikeTypeEnum,
    })
    relationType: LikeTypeEnum

    @Column('int', { name: 'parentId', comment: '父id' })
    parentId: number

    @CreateDateColumn({ name: 'createTime', comment: '记录创建时间' })
    createTime: Date | null;

    @DeleteDateColumn({ name: 'deleteTime', comment: '记录删除时间' })
    deleteTime: Date | null;
}