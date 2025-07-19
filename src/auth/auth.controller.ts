import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.validateUser(loginDto);
    if (!token) throw new UnauthorizedException('Invalid credentials');
    return { access_token: token };
  }

  @Post('register')
  async register(@Body() registerDto: { email: string; password: string; name: string }) {
    const token = await this.authService.register(registerDto);
    return { access_token: token };
  }
} 