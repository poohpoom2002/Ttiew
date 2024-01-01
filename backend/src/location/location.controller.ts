import { Review } from 'src/review/review.model';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
  Request
} from '@nestjs/common';

import { LocationsService } from './location.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

  @UseGuards(JwtAuthGuard)
  @Controller('/locations')
  export class LocationsController {
    constructor(private readonly LocationsService: LocationsService) {}
  
    @Post()
    async addLocation(
      @Body('category') locCategory:[string],
      @Body('keyword') locKeyword: [string],
      @Body('name') locName: string,
      @Body('location') locLocation: string,
      @Body('googleMap') locGoogleMap: string,
      @Body('openClose') locOpenClose: string,
      @Body('price') locPrice: string,
      @Body('phone') locPhone: string,
      @Body('website') locWebsite: string,
      @Body('img') locImg: string,
      @Body('detail') locDetail: string,
      @Body('review') locReview: Review[]
    ) {
      const generatedId = await this.LocationsService.insertLocation(
        locCategory,
        locKeyword,
        locName,
        locLocation,
        locGoogleMap,
        locOpenClose,
        locPrice,
        locPhone,
        locWebsite,
        locImg,
        locDetail,
        locReview,
      );
      return { id: generatedId };
    }
  
    @Get()
    async getAllLocations() {
      const Locations = await this.LocationsService.getLocations();
      return Locations;
    }
    
    @Get('search')
    async getLocationsBySearch(
      @Request() req,
      @Query() query : {
        name: string ,
        category: string,
        keyword: string
      },
    ) {
      if (!query.name) {
        query.name = '';
      }
      if (!query.category) {
        query.category = '';
      }
      if (!query.keyword) {
        query.keyword = '';
      }
      const categoryArray = query.category ? query.category.split(',') : [];
      const keywordArray = query.keyword ? query.keyword.split(',') : [];
      const locations = await this.LocationsService.getLocationsBySearch(query.name, categoryArray ,keywordArray, req.user);
      return locations;
    }

    @Get(':id')
    getLocation(@Param('id') locId: string) {
      return this.LocationsService.getSingleLocation(locId);
    }
  
    @Patch(':id')
    async updateLocation(
      @Param('id') locId: string,
      @Body('category') locCategory:[string],
      @Body('keyword') locKeyword: [string],
      @Body('name') locName: string,
      @Body('location') locLocation: string,
      @Body('googleMap') locGoogleMap: string,
      @Body('openClose') locOpenClose: string,
      @Body('price') locPrice: string,
      @Body('phone') locPhone: string,
      @Body('website') locWebsite: string,
      @Body('img') locImg: string,
      @Body('detail') locDetail: string,
      @Body('review') locReview: Review[]
    ) {
      await this.LocationsService.updateLocation(locId,
        locCategory,
        locKeyword,
        locName,
        locLocation,
        locGoogleMap,
        locOpenClose,
        locPrice,
        locPhone,
        locWebsite,
        locImg,
        locDetail,
        locReview,
      );
      return null;
    }
  
    @Delete(':id')
    async removeLocation(@Param('id') locId: string) {
        await this.LocationsService.deleteLocation(locId);
        return null;
    }
  }