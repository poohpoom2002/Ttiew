import {
    Controller,
    Body,
    Param,
    Post,
    Patch,
    Delete,
    UseGuards,
    Request
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/locations/review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post(':locationId')
    async addReview(
        @Param('locationId') locationId: string,
        @Request() req,
        @Body('description') userDescription: string,
    ) {
        await this.reviewService.addReview(locationId, req.user.id, userDescription);
        return null;
    }

    @Delete(':locationId')
    async deleteReview(
        @Param('locationId') locationId: string,
        @Request() req,
    ){
        await this.reviewService.deleteReview(locationId, req.user.id);
        return null;
    }

    @Patch(':locationId')
    async updateReview(
        @Param('locationId') locationId: string,
        @Request() req,
        @Body('description') userDescription: string
    ) {
        await this.reviewService.updateReview(locationId, req.user.id, userDescription);
        return null;
    }
}
