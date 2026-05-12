import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Post } from '../../users/entities/post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  author: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @CreateDateColumn()
  createdAt: Date;
}
