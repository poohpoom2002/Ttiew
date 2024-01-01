import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentModel } from './comments.model';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import { NotificationModule } from 'src/notification/notification.module';
import { PostModel } from 'src/posts/posts.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentModel }]),
    MongooseModule.forFeature([{ name: 'Post', schema: PostModel }]),
    UsersModule,
    PostsModule,
    NotificationModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentModule {}
