import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authDto: AuthDto) {
    const user = await this.userService.findEmail(authDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Comparer le mot de passe fourni avec le mot de passe hashé
    const isPasswordValid = await bcrypt.compare(
      authDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user; // Utilisateur authentifié
  }

  async login(user: User) {
    const payload = { username: user.fullName, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'your secret key', // Ensure this matches
      }),
    };
  }
}
