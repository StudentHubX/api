import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from 'src/entities/faculty.entity';
import { In, Repository } from 'typeorm';
import { industryFaculties } from 'src/industry/industry';
import { Industry } from 'src/entities/industry.entity';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty)
    private facultyRepository: Repository<Faculty>,
    @InjectRepository(Industry)
    private industryRepository: Repository<Industry>,
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
        }),
      );

      const flattenedFaculties = facultiesToUpload.flat();
      const uniqueFaculties = [...new Set(flattenedFaculties.map(f => f.name))]; // Get unique faculty names

      // Check for existing faculties and filter out those already in the database
      const existingFaculties = await this.facultyRepository.find({
        where: { name: In(uniqueFaculties) },
      });

      const existingFacultyNames = new Set(existingFaculties.map(faculty => faculty.name));

      const newFaculties = flattenedFaculties.filter(
        faculty => !existingFacultyNames.has(faculty.name),
      );

      await Promise.all(
        newFaculties.map(async (faculty) => {
          const newFaculty = this.facultyRepository.create(faculty);
          await this.facultyRepository.save(newFaculty);
        }),
      );
    } catch (error) {
      // Handle errors (log or throw as needed)
      console.error('Error creating faculties:', error);
    }
  }

  async findUsers(facultyId: number) {
    const faculty = await this.facultyRepository.findOne({
      where: { id: facultyId },
    });

    return faculty?.users || []; // Return an empty array if faculty not found
  }
}
