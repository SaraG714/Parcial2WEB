import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
  ) {}

  createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create({ ...dto, followers: dto.followers ?? 0 });
    return this.userRepo.save(user);
  }

  findUsers(): Promise<User[]> {
    return this.userRepo.find({ relations: ['posts'] });
  }

  async createPost(userId: number, dto: CreatePostDto): Promise<Post> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`Usuario ${userId} no existe`);
    const post = this.postRepo.create({ ...dto, likes: dto.likes ?? 0, user });
    return this.postRepo.save(post);
  }

  async findPosts(userId: number): Promise<Post[]> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException(`Usuario ${userId} no existe`);
    return this.postRepo.find({
      where: { user: { id: userId } },
      relations: ['comments'],
    });
  }
}
