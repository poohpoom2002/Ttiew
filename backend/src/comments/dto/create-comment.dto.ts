// create-comment.dto.ts
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  author: string;

  @IsString()
  postId: string;

  @IsString()
  content: string;
}
