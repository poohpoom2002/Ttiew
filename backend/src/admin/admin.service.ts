import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.model';

@Injectable()
export class AdminService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  // async findByUserId(id: string): Promise<User> {
  //   return this.userModel.findOne({ _id: id });
  // }

  // async findAll() {
  //   return this.userModel.find({}).then((user) => {
  //     return user;
  //   });
  // }
}
