import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // DB access for User
    private jwtService: JwtService, // JWT signing
  ) {}

  // -------------------------
  // REGISTER USER
  // -------------------------
  async register(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // hash password
    const user = this.userRepository.create({ email, password: hashedPassword }); // create new user
    return this.userRepository.save(user); // save user to DB
  }

  // -------------------------
  // LOGIN USER
  // -------------------------
  async login(email: string, password: string) { // <-- fixed: added password parameter
    const user = await this.userRepository.findOneBy({ email }); // find user by email
    if (!user) throw new Error('Invalid credentials'); // user not found

    const isPasswordValid = await bcrypt.compare(password, user.password); // compare entered password with hashed
    if (!isPasswordValid) throw new Error('Invalid credentials'); // wrong password

    const payload = { sub: user.id, email: user.email }; // data stored in JWT
    return {
      access_token: this.jwtService.sign(payload), // generate JWT
    };
  }
}



