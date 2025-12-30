import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // allow this module to use User entity
    JwtModule.register({ // configure JWT
      secret: 'your_jwt_secret', // secret key for signing tokens (replace with .env later)
      signOptions: { expiresIn: '1h' }, // tokens expire in 1 hour
    }),
  ],
  providers: [AuthService, JwtStrategy], // services and strategies used in this module
  controllers: [AuthController], // routes exposed by this module
})
export class AuthModule {}


