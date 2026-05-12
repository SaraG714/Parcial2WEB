import { Controller, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('posts')
@UseGuards(ApiKeyGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':id/comments')
  createComment(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCommentDto) {
    return this.postsService.createComment(id, dto);
  }
}
