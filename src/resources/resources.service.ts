import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Badge } from 'src/entities/badge.entity';
import { Professional } from 'src/entities/professional.entity';
import { Resource } from 'src/entities/resource.entity';
import { Student } from 'src/entities/student.entity';
import { Topic } from 'src/entities/topics.entity';
import { Repository } from 'typeorm';
import { ResourceDto } from './resource.dto';
import { Industry } from 'src/entities/industry.entity';


@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,

    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,

    @InjectRepository(Industry)
    private industryRepository: Repository<Industry>,
  ) {}

  async addResourceToLibrary(
    resource,
    authorType: string,
    user: Student | Professional,
    newTopic: Topic,
  ) {
    const newResource = this.resourceRepository.create({
      link: resource.link,
      title: resource.title,
      description: resource.description,
      authorType: authorType,
      author: user,
      topic: newTopic,
      type: resource.type
    });
    await this.resourceRepository.save(newResource); // Fixed saving to resourceRepository
  }

  async createResource(resource: ResourceDto, userId: number) {
    const [student, professional] = await Promise.all([
      this.studentRepository.findOne({ where: { userId: userId } }),
      this.professionalRepository.findOne({ where: { userId: userId } }),
    ]);

    let authorType = student ? 'stud' : 'prof'; // Simplified authorType assignment
    const user = student || professional;

    if (!user) {
      throw new Error('User not found');
    }
    

    const badgeId = 1;
    const badge = user.badges?.find((badge) => badge.id === badgeId); // Handle optional badges
    if (!badge) {
      throw new Error('User does not have the required badge');
    }

    const industries = await Promise.all(
      resource.industryIds.map((id) =>
        this.industryRepository.findOne({ where: { id } })
      )
    );

    let topicFromUser = await this.topicRepository.findOne({
      where: { name: resource.topicName },
    });
    if (!topicFromUser) {
      const newTopic = this.topicRepository.create({
        name: resource.topicName,
        industries: industries,
      });
      await this.topicRepository.save(newTopic);
      await this.addResourceToLibrary(resource, authorType, user, newTopic);
      return; // Early return after adding the resource
    }
    await this.addResourceToLibrary(resource, authorType, user, topicFromUser);
  }

  async getResource(id: number): Promise<Resource> {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      throw new Error('Resource not found');  // Better error handling
    }
    return resource;
  }
}
