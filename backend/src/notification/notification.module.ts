import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
// import { NotificationGateway } from './notification.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModel } from 'src/users/users.model';
import { NotificationController } from './notification.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UsersModel }])],
  providers: [NotificationService], //NotificationGateway,
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
