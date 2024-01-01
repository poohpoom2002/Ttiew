// posts.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Comment } from '../comments/comments.model';
import { UserDocument } from 'src/users/users.model';

@Schema({ collection: 'posts' , timestamps: true})
export class Post {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ default: Date.now }) // Add createdAt with default value
  createdAt: Date;

  // @Prop({ type: [{ type: 'ObjectId', ref: 'Comment' }] }) // Reference Comment model
  // comments: Comment[];

  @Prop({ type: 'ObjectId', ref: 'User' }) // Reference User model
  author: UserDocument;
}

export const PostModel = SchemaFactory.createForClass(Post);

export type PostDocument = Post & Document;
