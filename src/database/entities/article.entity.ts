import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键ID',
    unsigned: true,
  })
  id: number;

  @Column('bigint', { name: 'uid', comment: '作者id' })
  uid: number;

  @Column('varchar', { length: 20, name: 'title', comment: '标题' })
  title: string;

  @Column('text', { name: 'content', comment: '文章内容' })
  content: string;

  @Column('varchar', { name: 'poster', comment: '文章封面' })
  poster: string;

  @CreateDateColumn({ name: 'createTime', comment: '记录创建时间' })
  createTime: Date | null;

  @DeleteDateColumn({ name: 'deleteTime', comment: '记录删除时间' })
  deleteTime: Date | null;
}
