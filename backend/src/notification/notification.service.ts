// notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDto } from './dto/notification.dto';
import { UserDocument } from 'src/users/users.model';

@Injectable()
export class NotificationService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  // async create(user:any,createNotificationDto: CreateNotificationDto): Promise<Notification> {
  //   const createdNotification = new this.notificationModel(createNotificationDto);
  //   return createdNotification.save();
  // }

  // async findAll(userId: string): Promise<Notification[]> {
  //   return this.notificationModel.find({ userId }).exec();
  // }

  async addNotificationsToAuthor(
    notificationDto: NotificationDto,
    authorId: string,
  ) {
    const user = await this.userModel.findOne({ _id: authorId });

    const newNoti = {
      postId: notificationDto.postId,
      message: notificationDto.message,
      username: notificationDto.username,
      timestamp: new Date(),
    };
    user.notificationItems = [...user.notificationItems, newNoti];
    return await user.save();
    //return ();
  }

  async getNotification(user: any) {
    return user.notificationItems;
  }
}
