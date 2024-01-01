import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Location } from 'src/location/location.model';
export type UserDocument = User & Document;
export type likeObjectDocument = LikeObject & Document;
export type NotificationObjectDocument = NotificationObject & Document;

export class LikeObject {
  @Prop()
  placeId: string;

  @Prop()
  dateUserLike: Date;
}
export const LikeObjectModel = SchemaFactory.createForClass(LikeObject);

export class NotificationObject {
  @Prop()
  postId: string;

  @Prop()
  message: string;

  @Prop()
  username: string;

  @Prop()
  timestamp: Date;
}

export const NotificationObjectModel =
  SchemaFactory.createForClass(NotificationObject);

export class Notification {
  // @Prop()
  // postId: string;
  @Prop()
  username: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

@Schema({ collection: 'users' }) // ระบุชื่อคอลเล็กชันที่ต้องการ
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop(LikeObjectModel)
  likeItem: LikeObject[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }] })
  footprint: Location[];

  @Prop()
  footprintIsShowOnProfile: boolean[]; // Specify that the type is an array

  @Prop()
  countHearts: number;

  @Prop()
  heartsReloadTimer: number;

  @Prop()
  placesReloadTimer: number;

  @Prop()
  pageChangeTimestamp: Date;

  @Prop()
  picUrl: string;

  @Prop(NotificationObjectModel)
  notificationItems: Notification[];
}
//model==schema
export const UsersModel = SchemaFactory.createForClass(User);
