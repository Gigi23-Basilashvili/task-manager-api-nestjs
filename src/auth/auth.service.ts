import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async register(email: string, password: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = this.userRepository.create({
    email,
    password: hashedPassword,
  });

  return this.userRepository.save(user);
}

}


