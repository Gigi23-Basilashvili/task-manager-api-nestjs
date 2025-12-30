import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
async register(
  @Body('email') email: string,
  @Body('password') password: string,
) {
  const user = await this.authService.register(email, password);
  const { password: _, ...result } = user; 
  return result;
}

}

