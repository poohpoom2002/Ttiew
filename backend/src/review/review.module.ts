// review/review.module.ts

import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ReviewSchema } from './review.model';
import { LocationModule } from '../location/location.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),
    forwardRef(() => LocationModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
