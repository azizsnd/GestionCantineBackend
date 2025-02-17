import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userName', // Use 'userName' instead of the default 'username'
    });
  }

  async validate(userName: string, password: string): Promise<any> {

    const user = await this.authService.validateUser({ userName, password });
    if (!user) {
      throw new UnauthorizedException('Invalid userName or password');
    }
    return user;
  }
  
}
