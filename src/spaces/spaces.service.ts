import {
  Injectable,
  BadRequestException,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from 'src/entities/professional.entity';
import { Spaces } from 'src/entities/spaces.entity';
import { Student } from 'src/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateSpaceDto } from './spaces.dto';
@Injectable()
export class SpacesService {
  private readonly logger = new Logger('spaces');
  constructor(
    @InjectRepository(Spaces)
    private readonly spacesRepository: Repository<Spaces>,
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async createSpace(data: CreateSpaceDto) {
    const professionalUser = await this.professionalRepository.findOne({
      where: { userId: data.professionalId },
    });

    if (!professionalUser) {
      throw new BadRequestException('User doesnt exist');
    }

    try {
      const newSpace = this.spacesRepository.create({
        name: data.name,
        professionalCoordinator: professionalUser,
        industry: professionalUser.industry,
        maxNumberOfStudents: data.maxNumberOfStudents
      });
      await this.spacesRepository.save(newSpace);
    } catch (error) {
      this.logger.error(
        'A problem was caught while trying to create a new space',
        error.stack,
      );
    }
  }

  async joinSpace(spaceId: number, username: string) {
    const space = await this.spacesRepository.findOne({
      where: { id: spaceId },
    });
    if (!space) {
      throw new BadRequestException('Space not found');
    }

    if(space.studentMembers.length + 1 > space.maxNumberOfStudents) {
      throw new BadRequestException('Space cannot take in one more students')
    }

    const user = await this.studentRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    try {
      space.studentMembers.push(user);
      this.spacesRepository.save(space);
    } catch (error) {
      this.logger.error(
        'A problem occured while joining the space',
        error.stack,
      );
    }
  }
}
