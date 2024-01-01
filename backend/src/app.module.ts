import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LocationModule } from './location/location.module';
import { ReviewModule } from './review/review.module';
import { AdminModule } from './admin/admin.module';
import { PostsModule } from './posts/posts.module';
import { CommentModule } from './comments/comments.module';
import { NotificationModule } from './notification/notification.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:softdev@cluster0.gxuaxaj.mongodb.net/SoftdevProject?retryWrites=true&w=majority',
    ),
    AuthModule,
    UsersModule,
    LocationModule,
    ReviewModule,
    AuthModule,
    UsersModule,
    AdminModule,
    PostsModule,
    CommentModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
