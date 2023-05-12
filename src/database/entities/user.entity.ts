import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'uid', unsigned: true })
  uid: string;

  @Column('varchar', { name: 'nickname', nullable: true, length: 255 })
  nickname: string;

  @Column('varchar', { name: 'wechat_avatar_url', nullable: true, length: 255 })
  wechatAvatarUrl: string | null;

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    comment: '手机号',
    length: 255,
  })
  phone: string | null;

  @Column('tinyint', { name: 'gender', nullable: true, default: () => 0 })
  gender: number;

  @CreateDateColumn({ name: 'create_time' })
  createTime: Date | null;
}
