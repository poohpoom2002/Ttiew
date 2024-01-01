import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../comments/comments.model';
import { CreatePostDto, CreateCommentDto } from './dto/post.dto';
import { UserDocument } from 'src/users/users.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Post, PostDocument } from './posts.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>, // private readonly commentModel: Model<Comment>,
  ) {}

  async createPost(
    createPostDto: CreatePostDto,
    userId: string,
  ): Promise<PostDocument> {
    try {
      const post = new this.postModel({
        ...createPostDto,
        author: userId,
      });

      // Save the post to the database
      const createdPost = await post.save();

      return createdPost;
    } catch (error) {
      // Log the database-related error
      console.error('Database error:', error);

      // Handle the error and return a more informative response
      throw new HttpException(
        'Failed to create the post due to a database error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPostById(id: string): Promise<PostDocument> {
    return this.postModel.findById(id).populate('author', 'username').exec();
  }

  async getIdAuthorFromPostId(id: string){
    return this.postModel.findById(id).populate('author', 'username').exec();
  }
  
  async getAllPosts(): Promise<any> {
    return this.postModel.find().populate({path: 'author',select: 'username name'}).exec();
  }

  async getAllCommentsFromPosts(): Promise<Comment[]> {
    return await this.postModel.find();
  }
}
