import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MetricsModule } from './metrics/metrics.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { User } from './users/entities/user.entity';
import { Post } from './users/entities/post.entity';
import { Comment } from './posts/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'instagram.db',
      entities: [User, Post, Comment],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    MetricsModule,
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
