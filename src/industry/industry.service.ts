import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Industry } from 'src/entity/industry.entity';
import { Professional } from 'src/entity/professional.entity';
@Injectable()
export class IndustryService {
    constructor(
        @InjectRepository(Industry)
        private industryRepository: Repository<Industry>
    ) {}
    //Find an industry and return all users in the industry
    async findUsers(industryId: number): Promise<Professional[]> {
        const industry = await this.industryRepository.findOne({
            where: { id: industryId },
          });
          const usersInIndustry = industry.users;
          return usersInIndustry;
    }
}
