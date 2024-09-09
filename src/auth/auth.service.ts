import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


type AuthInput = { username: string; password: string };
type LoginInput = { username: string; password: string };
export type AuthResult = { access_token: string };

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(input: UserEntity): Promise<AuthResult | Error> {
    const { password, department, username, fullname, age, schoolId, country } = input;
    const salt = await bcrypt.genSalt(10);

    // const user = this.usersRepository.find({where: {username: username}})

    // if(user) {
    //   return new Error('User already exists')
    // }

    const hashedPassword = await bcrypt.hash(password, salt);
    const inputWithHashedPassword = {
      password: hashedPassword,
      username: username,
      fullname: fullname,
      age: age,
      department: department,
      schoolId: schoolId,
      country: country
    }
    const newUser = this.usersRepository.create(inputWithHashedPassword);
    console.log(inputWithHashedPassword)
    await this.usersRepository.save(newUser);

    const tokenPayload = {
      sub: newUser.userId,
      username: newUser.username,
    };

    return {
      access_token: await this.jwtService.signAsync(tokenPayload),
    };
  }

  async login(input: LoginInput): Promise<AuthResult | Error> {
    const user = await this.usersService.findUserByUsername(input.username);
    const passwordsMatch = await bcrypt.compare(input.password, user.password)

    if(!passwordsMatch) {
      return new UnauthorizedException()
    }
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(tokenPayload),
    };
   
  }


}
