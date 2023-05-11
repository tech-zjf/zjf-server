import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('test')
export class TestEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键ID',
    unsigned: true,
  })
  id: number;

  @Column({ type: 'varchar', length: 20, name: 'title', comment: '标题' })
  title: string;

  @Column()
  desc: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  createTime: Date;

  @DeleteDateColumn()
  deleteTime: Date;
}
