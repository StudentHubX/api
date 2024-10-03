import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from '../../entity/professional.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfessionalService {
    constructor(
        @InjectRepository(Professional)
        private usersRepository: Repository<Professional>,
    ) {}
    
     async findUserByUsername(username:string): Promise<Professional | undefined> {
        return await this.usersRepository.findOne({where: {username}})
     }

}
