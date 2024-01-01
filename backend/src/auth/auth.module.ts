//auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModel } from 'src/users/users.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UsersModel }]),

    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalAuthGuard, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
