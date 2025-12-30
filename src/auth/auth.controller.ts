import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Prefixes all routes with /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {} // Inject AuthService to use its logic

  // -------------------------
  // LOGIN ROUTE
  // -------------------------
  @Post('login') // POST /auth/login
  async login(
    @Body('email') email: string, // extract email from request body
    @Body('password') password: string, // extract password
  ) {
    return this.authService.login(email, password); // call service to handle login and return JWT
  }

  // -------------------------
  // REGISTER ROUTE
  // -------------------------
  @Post('register') // POST /auth/register
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.register(email, password); // create new user
    const { password: _, ...result } = user; // remove password before sending response
    return result; // return user info without password
  }
}

