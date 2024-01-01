//auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Request,
  UnauthorizedException,
  UseGuards,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body(new ValidationPipe({ skipMissingProperties: false })) signupDto: SignupDto) {
    const user = await this.authService.signup(signupDto);
    if (!user) {
      throw new UnauthorizedException('User registration failed');
    }
    return user;
  }

  // @UseGuards(LocalAuthGuard) // ใช้งาน LocalAuthGuard
  @Post('login')
  async login(@Body(new ValidationPipe({ skipMissingProperties: false })) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard) // ใช้งาน JwtAuthGuard เพื่อตรวจสอบ JWT
  async getProfile(@Request() req) {
    // console.log('getprofile');
    return this.authService.getProfile(req.user); // ส่งข้อมูลผู้ใช้งานไปยัง AuthService
  }
}
