import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import bcrypt from 'bcrypt';

type AuthInput = { username: string; password: string };

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
  ) {}

  async signUp(input: UserEntity): Promise<UserEntity> {
    const { password } = input;

    const hashedPassword = await bcrypt.hash(password, 10);
    const inputWithHashedPassword = {
      password: hashedPassword,
      ...input,
    };
    const newUser = this.usersRepository.create(inputWithHashedPassword);
    return await this.usersRepository.save(newUser);
  }
  async validateUser(input: AuthInput): Promise<boolean> {
    const user = await this.usersService.findUserByUsername(input.username);
    if (user && input.password === user.password) {
      return true;
    }
  }
}
