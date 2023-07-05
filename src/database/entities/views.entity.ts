import { ViewTypeEnum } from "@/modules/views/views.constant";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('views')
export class ViewsEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: '主键id',
        unsigned: true
    })
    id: number

    @Column('bigint', { name: 'uid', comment: '作者id' })
    uid: number;

    @Column('text', { name: 'content', comment: '评论内容' })
    content: string

    @Column({
        type: "enum",
        enum: ViewTypeEnum,
    })
    relationType: ViewTypeEnum

    @Column('int', { name: 'parentId', comment: '父id' })
    parentId: number

    @CreateDateColumn({ name: 'createTime', comment: '记录创建时间' })
    createTime: Date | null;

    @DeleteDateColumn({ name: 'deleteTime', comment: '记录删除时间' })
    deleteTime: Date | null;
}