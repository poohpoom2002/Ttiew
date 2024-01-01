// auth/dtos/signup.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: any;

  @IsString()
  @IsNotEmpty()
  // @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  email: any;
}
