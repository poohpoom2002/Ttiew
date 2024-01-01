// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // console.log('JwtStrategy');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret, // ใส่ secret key ของคุณที่นี่
    });
  }

  async validate(payload: any) {
    // console.log('payload : ', payload);
    const user = await this.authService.validateUserById(
      payload.userId,
      // payload.username,
    );
    if (!user) {
      // console.log('dont have user from validate jwtstrea');
      throw new UnauthorizedException('jwtstre');
    }
    return user;
  }
}
