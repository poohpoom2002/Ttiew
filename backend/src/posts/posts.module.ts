// posts.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostModel } from './posts.model';
import { CommentModel } from '../comments/comments.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostModel }])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
