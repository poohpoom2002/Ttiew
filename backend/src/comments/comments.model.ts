import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';

@Schema({ collection: 'comments' , timestamps: true })
export class Comment {
  _id: mongoose.Types.ObjectId;  
  
  @Prop()
  content: string;

  @Prop({ default: Date.now }) // Add createdAt with default value
  createdAt: Date;

  @Prop()
  author: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post'})
  post: Post;
  
  // You might have more properties in your Comment model.
}

export const CommentModel = SchemaFactory.createForClass(Comment);