import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from 'src/entities/faculty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacultiesService {
    constructor(
        @InjectRepository(Faculty)
        private facultyRepository: Repository<Faculty>
    ) {}

    
    async findUsers(facultyId: number) {
        const faculty = await this.facultyRepository.findOne({where: {id: facultyId}})

        return faculty.users
    }
}
