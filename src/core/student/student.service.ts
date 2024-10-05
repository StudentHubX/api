import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../../entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private usersRepository: Repository<Student>,
    ) {}
     async findUserByUsername(username:string): Promise<Student | undefined> {
        return await this.usersRepository.findOne({where: {username}})
     }

}
