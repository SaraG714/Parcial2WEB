import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../users/entities/post.entity';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async createComment(postId: number, dto: CreateCommentDto): Promise<Comment> {
    const post = await this.postRepo.findOneBy({ id: postId });
    if (!post) throw new NotFoundException(`Post ${postId} no existe`);
    const comment = this.commentRepo.create({ ...dto, post });
    return this.commentRepo.save(comment);
  }
}
