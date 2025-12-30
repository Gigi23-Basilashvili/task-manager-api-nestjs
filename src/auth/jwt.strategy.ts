import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // DB access to fetch user
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extract JWT from "Authorization: Bearer <token>"
      secretOrKey: 'your_jwt_secret', // secret for validation
    });
  }

  async validate(payload: any) {
    // Called automatically by AuthGuard
    const user = await this.userRepository.findOneBy({ id: payload.sub }); // fetch user from DB using payload
    return user; // attach user to req.user
  }
}

