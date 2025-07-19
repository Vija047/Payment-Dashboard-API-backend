import { IsString, IsIn, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsIn(['admin', 'viewer', 'user'])
  role: string;
} 