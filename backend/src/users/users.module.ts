import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModel } from './users.model';
import { UsersController } from './users.controller';
import { LocationModule } from 'src/location/location.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UsersModel }]),
    LocationModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
