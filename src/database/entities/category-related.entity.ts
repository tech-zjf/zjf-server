import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category-related')
export class CategoryRelatedEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: '分类关联表id',
  })
  id: string;

  @Column('int', { name: 'categoryId', comment: '分类id' })
  categoryId: string;

  @Column('varchar', { name: 'contentType', comment: '内容类型' })
  contentType: string;

  @Column('int', { name: 'contentId', comment: '内容id' })
  contentId: string;

  @CreateDateColumn()
  createTime: Date | null;

  @DeleteDateColumn()
  deleteTime: Date | null;
}
