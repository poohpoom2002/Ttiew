// posts.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, CreateCommentDto } from './dto/post.dto';
import { UserDocument } from 'src/users/users.model';
import { Request } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: Request,
  ): Promise<any> {
    try {
      const user = req.user as UserDocument; // Assuming user is in the request
      console.log('User object:', user); // Add this line for debugging

      if (!user || !user._id) {
        throw new NotFoundException('User not found or missing _id');
      }

      const userId = user._id; // Assuming the user ID is stored in the _id field

      // Create the post and return the result
      const createdPost = await this.postsService.createPost(
        createPostDto,
        userId,
      );
      console.log('Post created:', createdPost);
      return createdPost;
    } catch (error) {
      // Handle the error and return an appropriate response
      throw new HttpException(
        'Failed to create the post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getPostById(@Param('id') id: string): Promise<any> {
    const post = await this.postsService.getPostById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Get()
  async getAllPosts(): Promise<any> {
    console.log("get all posts")
    return this.postsService.getAllPosts();
  }

  @Get('comments')
  async getAllCommentsFromPosts(): Promise<any> {
    return await this.postsService.getAllCommentsFromPosts();
  }
}
