// editprofile.dto.ts
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class EditProfileDto {
  @IsOptional()
  username: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  newPassword: string;

  @IsOptional()
  picUrl: string;
}
