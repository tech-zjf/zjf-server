import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '主键id',
    name: 'id',
  })
  id: string;

  @Column('varchar', { name: 'name', comment: '分类名称', length: 255 })
  name: string;

  @Column('varchar', { name: 'icon', comment: '分类icon', length: 255 })
  icon: string;

  @Column('int', { name: 'uid', comment: '创建用户' })
  uid: string;

  @CreateDateColumn({ name: 'createTime', comment: '记录创建时间' })
  createTime: Date | null;

  @DeleteDateColumn({ name: 'deleteTime', comment: '记录删除时间' })
  deleteTime: Date | null;
}
