import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Industry } from 'src/entities/industry.entity';
import { Professional } from 'src/entities/professional.entity';
import { Faculty } from 'src/entities/faculty.entity';
import { industryFaculties } from './industry';
@Injectable()
export class IndustryService {
    constructor(
        @InjectRepository(Industry)
        private industryRepository: Repository<Industry>,

        @InjectRepository(Faculty)
        private facultyRepository: Repository<Faculty>
    ) {}

    async findFaculties(industry): Promise<Faculty[]> {
      const faculties = industry.faculties.map(async faculty => {
        return await this.facultyRepository.findOne({where: {name: faculty}})
      })
      return faculties
    }
    async createIndustries() {
      
        try {
          const industryEntities = await Promise.all(
            industryFaculties.map(async (industry) => {
              // const faculties = await this.findFaculties(industry);
              return this.industryRepository.create({
                name: industry.industry,
              });
            }),
          );
            await Promise.all(
              industryEntities.map( (industry) =>
                 this.industryRepository.save(industry),
              ),
            );
      
            console.log('industries have been created successfully.');
          } catch (error) {
            console.error('Error creating industries:', error);
            throw error; // Re-throwing the error so that it can be caught by higher-level handlers if needed
          }
        }
    //Find an industry and return all users in the industry
    async findUsers(industryId: number): Promise<Professional[]> {
        const industry = await this.industryRepository.findOne({
            where: { id: industryId },
          });
          const usersInIndustry = industry.users;
          return usersInIndustry;
    }

    async initializeIndustries() {
      const industryNames = [
        "Technology",
        "Gaming",
        "Data Science",
        "Cybersecurity",
        "Hardware Development",
        "Software Development",
        "Artificial Intelligence",
      ];
    
      try {
        for (const name of industryNames) {
          // Check if the industry already exists
          const existingIndustry = await this.industryRepository.findOne({ where: { name } });
    
          if (!existingIndustry) {
            // Create and save the industry if it doesn't exist
            const industry = this.industryRepository.create({ name });
            await this.industryRepository.save(industry);
            console.log(`Industry ${name} created.`);
          } else {
            console.log(`Industry ${name} already exists.`);
          }
        }
      } catch (error) {
        console.error("Error initializing industries:", error);
      }
    }
}
