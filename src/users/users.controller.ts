import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';

@Controller('users')
@UseGuards(ApiKeyGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  findUsers() {
    return this.usersService.findUsers();
  }

  @Post(':id/posts')
  createPost(@Param('id', ParseIntPipe) id: number, @Body() dto: CreatePostDto) {
    return this.usersService.createPost(id, dto);
  }

  @Get(':id/posts')
  findPosts(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findPosts(id);
  }
}
