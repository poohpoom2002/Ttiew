import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  UseGuards,
  Request,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EditProfileDto } from './dto/editProfile.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch()
  async editProfile(
    @Request() req,
    @Body(new ValidationPipe({ skipMissingProperties: false }))
    editProfileDto: EditProfileDto,
  ) {
    return await this.usersService.editProfile(req.user, editProfileDto);
  }

  @Get('profile/like/item')
  async getlikeItem(@Request() req) {
    return this.usersService.getLikeItem(req.user.id);
  }

  @Post('profile/like/add')
  async addLikeItem(@Request() req, @Body() body: any) {
    const { placeId } = body;
    // console.log(body, placeId);
    return this.usersService.addLikeItem(req.user.id, placeId);
  }

  @Post('profile/like/remove')
  async removeLikeItem(@Request() req) {
    return this.usersService.removeLikeItem(req.user);
  }

  @Post('profile/footprint/add')
  async addFootprintItem(@Request() req, @Body() body: any) {
    const { placeId } = body;
    return this.usersService.addFootprintItem(req.user.id, placeId);
  }

  @Post('profile/ToggleIsShowOnProfile/:id')
  async ToggleIsShowOnProfile(@Request() req, @Param('id') id: string) {
    return this.usersService.toggleIsShowOnProfile(req.user.id, id);
  }

  @Get('profile/footprint/item')
  async getFootprintItem(@Request() req) {
    return this.usersService.getFootprintItem(req.user.id);
  }

  @Post('profile/heartcountup')
  async countupHeart(@Request() req) {
    return this.usersService.countupHeart(req.user);
  }

  @Post('profile/heartcountdown')
  async countdownHeart(@Request() req) {
    return this.usersService.countdownHeart(req.user);
  }

  @Get('profile/heart')
  async getHeartTimeLeft(@Request() req) {
    return this.usersService.getHeartTimeLeft(req.user.id);
  }

  @Post('profile/heart')
  async updateHeartReloadTimer(@Request() req, @Body() body: any) {
    const { time } = body;
    return this.usersService.updateHeartReloadTimer(req.user.id, Number(time));
  }

  @Get('profile/place')
  async getPlaceTimeLeft(@Request() req) {
    return this.usersService.getPlaceTimeLeft(req.user.id);
  }

  @Post('profile/place')
  async updatePlaceReloadTimer(@Request() req, @Body() body: any) {
    const { time } = body;
    return this.usersService.updatePlaceReloadTimer(req.user.id, Number(time));
  }

  @Post('profile/pageChange')
  async updatePageChangeTime(@Request() req) {
    return this.usersService.updatePageChangeTime(req.user.id);
  }

  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return this.usersService.findByUserId(id);
  }

  @Get('profile/info')
  async getUserInfo(@Request() req) {
    console.log('profile info');
    return this.usersService.getUserInfo(req.user);
  }
}
