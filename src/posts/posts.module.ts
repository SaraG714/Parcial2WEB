import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from '../users/entities/post.entity';
import { Comment } from './entities/comment.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment]), AuthModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
