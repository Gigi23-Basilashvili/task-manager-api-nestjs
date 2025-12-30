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
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }
  async login(email: string) {
    
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new Error('Invalid credentials');

   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

   
    const payload = { sub: user.id, email: user.email };

   
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


