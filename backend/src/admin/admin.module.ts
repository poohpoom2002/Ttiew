import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModel } from 'src/users/users.model';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UsersModel }])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
