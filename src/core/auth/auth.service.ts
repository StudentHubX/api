import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Department } from 'src/entity/department.entity';
import { CreateUserDto } from './auth.dto';
import { Student } from 'src/entity/student.entity';
import { Professional } from 'src/entity/professional.entity';
import { Industry } from 'src/entity/industry.entity';

type AuthInput = { username: string; password: string };
type LoginInput = { isStudent: boolean; username: string; password: string };
export type AuthResult = { access_token: string };

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Professional)
    
    private readonly professionalRepository: Repository<Professional>,
    @InjectRepository(Industry)
    private readonly industryRepository: Repository<Industry>,

    private readonly jwtService: JwtService,
  ) {}

  async signUp(input: CreateUserDto): Promise<AuthResult | Error> {
    const {isStudent} = input 
    if(!isStudent) {
      return this.professionalSignUp(input)
    } 
    return this.studentSignUp(input)
  }

  async login(input: LoginInput): Promise<AuthResult | Error> {

    if (input.isStudent) {
      return this.studentLogin(input)
    } else {
      let user = await this.professionalRepository.findOne({
        where: { username: input.username },
      });
    }

  }
  /* 
    This is where all the logic for the signup and login for both students and professionals resides
  */
  async studentSignUp(input: CreateUserDto) {
    const {
      password,
      departmentId,
      username,
      fullname,
      age,
      schoolId,
      country,
      gender,
    } = input;
    const salt = await bcrypt.genSalt(10);

    const user = this.studentRepository.find({ where: { username: username } });

    if (user) {
      return new Error('User already exists');
    }
    const departmentfromEnity = await this.departmentRepository.findOne({
      where: { id: departmentId },
    });
    if (!departmentfromEnity) {
      return new Error('Department not found');
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const inputWithHashedPassword = {
      password: hashedPassword,
      username: username,
      fullname: fullname,
      age: age,
      department: departmentfromEnity,
      schoolId: schoolId,
      country: country,
      gender: gender,
    };
    const newUser = this.studentRepository.create(inputWithHashedPassword);
    console.log(inputWithHashedPassword);
    await this.studentRepository.save(newUser);

    const tokenPayload = {
      sub: newUser.userId,
      username: newUser.username,
    };

    return {
      access_token: await this.jwtService.signAsync(tokenPayload),
    };
  }
  async studentLogin(input: LoginInput) {
    const user = await this.studentRepository.findOne({where: {username: input.username}})
    const passwordsMatch = await bcrypt.compare(input.password, user.password);
    if (!passwordsMatch) {
      return new UnauthorizedException();
    }
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(tokenPayload),
    };
  }

  async professionalLogin(input: CreateUserDto) {
    const user = await this.professionalRepository.findOne({where: {username: input.username}})
    const passwordsMatch = await bcrypt.compare(input.password, user.password);
    if (!passwordsMatch) {
      return new UnauthorizedException();
    }
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(tokenPayload),
    };
  }
  async professionalSignUp(input: CreateUserDto) {
    const {
      password,
      industryId,
      username,
      fullname,
      age,
      country,
      gender,
      role,
      yearsOfExperience,
      nameOfOrganization
    } = input;
    const salt = await bcrypt.genSalt(10)
    //check if user is already in existence
    const user = await this.professionalRepository.findOne({where: {username: username}})
    if(user) {
      return new Error('User already exists');
    }

    const industryFromEntity = await this.industryRepository.findOne({where: {id: industryId}})
    if(!industryFromEntity) {
      return new Error('Industry not found')
    }

    const hashedPassword = await bcrypt.hash(password, salt);
    const inputWithHashedPassword = {
      password: hashedPassword,
      username: username,
      fullname: fullname,
      age: age,
      Industry: industryFromEntity,
      country: country,
      gender: gender,
      role: role,
      yearsOfExperience: yearsOfExperience,
      nameOfOrganization: nameOfOrganization,

    };
    const newUser = this.professionalRepository.create(inputWithHashedPassword);
    console.log(inputWithHashedPassword);
    await this.professionalRepository.save(newUser);

    const tokenPayload = {
      sub: newUser.userId,
      username: newUser.username,
    };

    return {
      access_token: await this.jwtService.signAsync(tokenPayload),
    };
  }
}
