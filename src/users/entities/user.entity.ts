import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ default: 0 })
  followers: number;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;
}
