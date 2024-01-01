// Import the Comment model
import { Controller, Get, Post, Body, Param, NotFoundException, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';
import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDocument } from 'src/users/users.model';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getAll(): Promise<Comment[]>{
    return await this.commentsService.findAll();
  }

  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto, @Req() req: Request): Promise<Comment> { 
    const user = req.user as UserDocument; // Assuming user is in the request
    const userName = user.username;

    const result = await this.commentsService.createComment(createCommentDto, userName);
    return result;
  }

  @Get('post/:postId')
  async getCommentsByPostId(@Param('postId') postId: string): Promise<Comment[]> {
  return await this.commentsService.getCommentsByPostId(postId);
}
}