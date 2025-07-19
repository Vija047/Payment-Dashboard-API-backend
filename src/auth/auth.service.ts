import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(loginDto: LoginDto): Promise<string | null> {
    // Try to find by email first, then username for backwards compatibility
    const user = await this.usersService.findByEmail(loginDto.username) ||
      await this.usersService.findByUsername(loginDto.username);
    if (user && await bcrypt.compare(loginDto.password, user.password)) {
      const payload = { sub: user._id, username: user.username || user.email, role: user.role };
      return this.jwtService.sign(payload);
    }
    return null;
  }

  async register(registerDto: { email: string; password: string; name: string }): Promise<string> {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Create user (UsersService will hash the password)
    const user = await this.usersService.create({
      email: registerDto.email,
      username: registerDto.email, // Use email as username
      password: registerDto.password, // Don't hash here, let UsersService do it
      name: registerDto.name,
      role: 'user'
    });

    // Generate and return token
    const payload = { sub: user._id, username: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
} 