import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from 'src/common/guards/local.guard';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async validate(@Request() req): Promise<any> {
    return await this.authService.login(req.user);
  }
}
