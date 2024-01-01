import { HttpException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.model';
import { LocationsService } from '../location/location.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
    private readonly locationsService: LocationsService,
    private readonly usersService: UsersService,
  ) {}

  async addReview(locationId: string, userId: string, userDescription: string) {
    try {
      const updateReviewlocation =
        await this.locationsService.findLocation(locationId);
      const reviewUser = await this.usersService.findByUserId(userId);

      const newReview = new this.reviewModel({
        username: reviewUser.username,
        description: userDescription,
      }) as Review;

      // Push the new review to the location's reviews array
      updateReviewlocation.review.push(newReview);

      // Save the updated location document
      await updateReviewlocation.save();

      await this.usersService.countupHeart(userId);

      // Return the newly added review (optional)
      return newReview;
    } catch (error) {
      console.error('Error adding review:', error);
    }
  }

  async deleteReview(locationId: string, userId: string) {
    const Reviewedlocation =
      await this.locationsService.findLocation(locationId);
    const reviewUser = await this.usersService.findByUserId(userId);
    const newArray = await Reviewedlocation.review.filter(
      (review) => review.username !== reviewUser.username,
    );

    if (newArray.length === Reviewedlocation.review.length) {
      throw new NotFoundException('Could not find review.');
    } else {
      Reviewedlocation.review = newArray;
    }
    await Reviewedlocation.save();
  }

  async updateReview(
    locationId: string,
    userId: string,
    userDescription: string,
  ) {
    let flag = 0;
    const Reviewedlocation =
      await this.locationsService.findLocation(locationId);
    const reviewUser = await this.usersService.findByUserId(userId);

    for (let i = 0; i < Reviewedlocation.review.length; i++) {
      if (Reviewedlocation.review[i].username === reviewUser.username) {
        Reviewedlocation.review[i].description = userDescription;
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      throw new NotFoundException('Could not find review.');
    } else {
      await Reviewedlocation.save();
    }
  }
}
