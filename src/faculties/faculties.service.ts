import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from 'src/entities/faculty.entity';
import { Repository } from 'typeorm';
import { industryFaculties } from 'src/industry/industry';
import { Industry } from 'src/entities/industry.entity';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty)
    private facultyRepository: Repository<Faculty>,
    @InjectRepository(Industry)
    private industryRepository: Repository<Industry>
  ) {}

  getFaculties(industry): string[] {
    return industry.faculties.map((faculty) => {
      return faculty;
    });
  }
  async create() {
    try {
      // Get each industry and its faculties
      const facultiesToUpload = await Promise.all(
        industryFaculties.map(async (industry) => {
          // Find the IndustryEntity by name
          const IndustryEntity = await this.industryRepository.findOne({
            where: { name: industry.industry },
          });
    
          
          return industry.faculties.map((faculty) => ({
            name: faculty,
            industry: IndustryEntity, 
          }));
        })
      );
    
      
      const flattenedFaculties = facultiesToUpload.flat();
    
      await Promise.all(
        flattenedFaculties.map(async (faculty) => {
          const newFaculty = this.facultyRepository.create(faculty)
          await this.facultyRepository.save(newFaculty)
        }
        )
      )} catch (error) {}
  }
  async findUsers(facultyId: number) {
    const faculty = await this.facultyRepository.findOne({
      where: { id: facultyId },
    });

    return faculty.users;
  }
}
