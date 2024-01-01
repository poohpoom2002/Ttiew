// user.controller.ts
import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Request,
} from '@nestjs/common';
// import { NotificationGateway } from './notification.gateway'; // import WebSocket Gateway
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotificationService } from './notification.service';

@Controller('notification')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(
    // private readonly notificationGateway: NotificationGateway,
    private notificationService: NotificationService,
  ) {}

  @Post()
  async addNotificationsToAuthor(@Request() req, @Body() body: any) {
    const { authorId } = body;
    const username = req.user.username;
    return this.notificationService.addNotificationsToAuthor(
      authorId,
      username,
    );
  }

  @Get()
  async getNotification(@Request() req, @Body() body: any) {
    return this.notificationService.getNotification(req.user);
  }
}
