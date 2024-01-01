import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async getProfile(user: any) {
    return this.userModel.findOne({ _id: user._id });
  }

  async signup(signupDto: SignupDto): Promise<User | String> {
    try {
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);

      const newUser = new this.userModel({
        // ...signupDto,
        username: signupDto.username,
        name: signupDto.name,
        email: signupDto.email,
        password: hashedPassword,
        countHearts: 20,
        likeItem: [],
        footprintItem: [],
        heartsReloadTimer: null,
        placesReloadTimer: null,
        pageChangeTimestamp: new Date(),
        picUrl: null,
        notificationItems: [],
      });
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        // MongoDB error code 11000 indicates a duplicate key error.
        // Check which key caused the duplication (username or email).
        if (error.keyPattern && error.keyPattern.username) {
          throw new Error('Username is already taken.');
          // return 'Username is already taken.';
        } else if (error.keyPattern && error.keyPattern.email) {
          throw new Error('Email is already registered.');
          // return 'Email is already registered.';
        }
      } else {
        throw error;
        // Handle other errors or re-throw them if needed.
      }
    }
  }

  async login(signinDto: LoginDto) {
    const user = await this.userModel.findOne({ username: signinDto.username });
    if (!user || !(await bcrypt.compare(signinDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials login');
    }
    const payload = { userId: user._id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(_id: string, username: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async validateUserById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      // console.log('not success validateUserById ');
      throw new UnauthorizedException('Not found - validateUserById');
    }
    // console.log('success validateUserById');
    return user;
  }
}
