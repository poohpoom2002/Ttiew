import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { LikeObject, User, UserDocument } from './users.model';
import { EditProfileDto } from './dto/editProfile.dto';
import * as bcrypt from 'bcrypt';
import {
  differenceInDays,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { LocationsService } from 'src/location/location.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private readonly locationsService: LocationsService,
  ) {}

  //defaule time calculate&return - seconds

  async updatePlaceReloadTimer(userId: Number, timeLeft: Number) {
    return await this.userModel.findByIdAndUpdate(
      userId,
      { placesReloadTimer: timeLeft },
      { new: true },
    );
  }

  async updateHeartReloadTimer(userId: string, timeLeft: Number) {
    return await this.userModel.findByIdAndUpdate(
      userId,
      { heartsReloadTimer: timeLeft },
      { new: true },
    );
  }

  async updatePageChangeTime(userId: string) {
    const newTime = new Date();
    // console.log(newTime);
    return await this.userModel.findByIdAndUpdate(
      userId,
      { pageChangeTimestamp: newTime },
      { new: true },
    );
  }

  async getPlaceTimeLeft(userId: string): Promise<Number> {
    const user = await this.userModel.findById(userId).exec();
    const currentDate = new Date();
    const timeLeft = user.placesReloadTimer;
    const timestamp = user.pageChangeTimestamp;
    console.log(
      `${currentDate} - ${timestamp} = ${differenceInSeconds(
        currentDate,
        timestamp,
      )} compare with ${timeLeft}`,
    );
    if (differenceInDays(currentDate, timestamp) == 0) {
      const diffInSec = differenceInSeconds(currentDate, timestamp);
      //sec
      if (diffInSec >= timeLeft) {
        //finish countdown
        await this.userModel.findByIdAndUpdate(
          userId,
          { placesReloadTimer: 0 },
          { new: true },
        );
        return 0;
      } else {
        return diffInSec;
      }
      //finsih
    } else {
      return 0;
    }
  }

  async countupHeart(user: any) {
    const res = await this.userModel.findByIdAndUpdate(
      user.id,
      { countHearts: user.countHearts + 1 },
      { new: true },
    );
    return res.countHearts;
  }

  async countdownHeart(user: any) {
    const res = await this.userModel.findByIdAndUpdate(
      user.id,
      { countHearts: user.countHearts - 1 },
      { new: true },
    );
    return res.countHearts;
  }

  async getHeartTimeLeft(userId: string): Promise<Number> {
    const user = await this.userModel.findById(userId).exec();
    const currentDate = new Date();
    const timeLeft = user.heartsReloadTimer;
    const timestamp = user.pageChangeTimestamp;
    if (differenceInDays(currentDate, timestamp) == 0) {
      const diffInSec = differenceInSeconds(currentDate, timestamp);
      //sec
      if (diffInSec >= timeLeft) {
        //finish countdown
        //heart increase +1
        await this.userModel.findByIdAndUpdate(
          userId,
          { heatsReloadTimer: 0, countHearts: user.countHearts + 1 },
          { new: true },
        );
        return 0;
      } else {
        return diffInSec;
      }
      //finsih
    } else {
      await this.userModel.findByIdAndUpdate(
        userId,
        { heatsReloadTimer: 0, countHearts: user.countHearts + 1 },
        { new: true },
      );
      return 0;
    }
  }
  async addFootprintItem(userId: string, placeId: string) {
    const user = await this.userModel.findById(userId).exec();
    const location = await this.locationsService.findLocation(placeId);
    user.footprint.push(location);
    user.footprintIsShowOnProfile.push(false);
    await user.save();
    return user;
  }

  async toggleIsShowOnProfile(userId: string, placeId: string) {
    const user = await this.userModel.findById(userId).populate('footprint');
    for (let i = 0; i < user.footprint.length; i++) {
      if (user.footprint[i]._id.toString() === placeId) {
        user.footprintIsShowOnProfile[i] = user.footprintIsShowOnProfile[i]
          ? false
          : true;
        await user.save();
        return user;
      }
    }
    return undefined;
  }

  async getFootprintItem(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId).populate('footprint');
    return user.footprint;
  }

  async getLikeItem(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    // console.log(user);
    const locationPromises = user.likeItem.map(async (item) => {
      // console.log(item.placeId);
      return await this.locationsService.findLocation(item.placeId);
    });

    const locationData = await Promise.all(locationPromises);
    return locationData;
  }

  async removeLikeItem(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    const currentDate = new Date();
    //2 days remove item
    // user.likeItem = user.likeItem.filter(
    //   (item) => differenceInDays(currentDate, item.dateUserLike) <2, //ไม่ต้องใส่เครื่องหมายน้อยกว่าถูกแล้ว
    // );

    //5ถ้าใช้ <=5 เวลาต่าง 5.59 ก็ยังไม่โดนลบ เดาว่าไม่เก็บโจทย์
    // ถ้าจะให้ 5 ถูก ใช้ <5

    user.likeItem = user.likeItem.filter(
      (item) => differenceInMinutes(currentDate, item.dateUserLike) <= 5,
    );
    return await user.save();
  }

  async addLikeItem(userId: string, placeId: string) {
    const user = await this.userModel.findById(userId).exec();

    const newLikeItem = {
      placeId: placeId,
      dateUserLike: new Date(),
    };
    // console.log(newLikeItem);
    user.likeItem = [
      ...user.likeItem,
      {
        placeId: placeId,
        dateUserLike: new Date(),
      },
    ];
    return await user.save();
  }

  async editProfile(user: any, editProfileDto: EditProfileDto) {
    if (!(await bcrypt.compare(editProfileDto.password, user.password))) {
      throw new UnauthorizedException('Invalid Password');
    }
    // console.log(editProfileDto);
    const updateFields = {
      name: user.name,
      username: user.username,
      password: user.passwosrd,
      picUrl: user.picUrl,
    };
    // console.log(editProfileDto);
    if (editProfileDto.name) updateFields.name = editProfileDto.name;
    if (editProfileDto.username)
      updateFields.username = editProfileDto.username;
    if (editProfileDto.newPassword) {
      const hashedPassword = await bcrypt.hash(editProfileDto.newPassword, 10);
      updateFields.password = hashedPassword;
    }
    if (editProfileDto.picUrl) updateFields.picUrl = editProfileDto.picUrl;

    const updateUser = await this.userModel.findByIdAndUpdate(
      user.id,
      updateFields,
      { new: true },
    );
    return updateUser;
  }

  async getUserInfo(user: any) {
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
  }

  async findByUserId(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }
}
