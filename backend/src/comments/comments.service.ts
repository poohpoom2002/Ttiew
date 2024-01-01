// comments.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { NotificationService } from 'src/notification/notification.service';
import { Post, PostDocument } from 'src/posts/posts.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private readonly userService: UsersService,
    private readonly postService: PostsService,
    private readonly notifiactionService: NotificationService,
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.commentModel
      .find()
      .populate({ path: 'author', select: 'username email' });
  }

  async createComment(
    createCommentDto: CreateCommentDto,
    username: string,
  ): Promise<Comment> {
    try {
      // const author = await this.userService.findByUserId(createCommentDto.author);
      const post = await this.postService.getPostById(createCommentDto.postId);
      const postObject = await this.postModel
        .findById(createCommentDto.postId)
        .populate('author', 'username')
        .exec();
      // const authorId = postObject.author._id;
      // console.log('post', post);
      // console.log('postObject', postObject);
      // console.log('postObject author', postObject.author.id);

      console.log('postObject author id', postObject.author.id);
      await this.notifiactionService.addNotificationsToAuthor(
        {
          postId: postObject.id,
          message: 'comment on your post',
          username: username,
        },
        postObject.author.id,
      );
      return await this.commentModel.create({
        author: username,
        post: post,
        content: createCommentDto.content,
      });
    } catch (err) {
      throw new HttpException(
        'Error to create comment: ' + err.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    try {
      return await this.commentModel
        .find({ post: postId })
        .populate({ path: "author", select: 'username email' });
    } catch (err) {
      throw new HttpException('Error fetching comments: ' + err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  // You can add more methods for retrieving and managing comments here.
}
