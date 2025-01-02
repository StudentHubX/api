import {
  Injectable,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professional } from 'src/entities/professional.entity';
import { Spaces } from 'src/entities/spaces.entity';
import { Student } from 'src/entities/student.entity';
import { SpacePost } from 'src/entities/spacePost.entity';
import { SpacePostComment } from 'src/entities/spacePostComment.entity';
import { Event } from 'src/entities/event.entity';
import {
  CreateSpaceDto,
  spacePostDTO,
  CreateCommentDTO,
  ScheduleEventDTO,
} from './spaces.dto';

@Injectable()
export class SpacesService {
  private readonly logger = new Logger('SpacesService');

  constructor(
    @InjectRepository(Spaces)
    private readonly spacesRepository: Repository<Spaces>,
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(SpacePost)
    private readonly spacePostRepository: Repository<SpacePost>,
    @InjectRepository(SpacePostComment)
    private readonly commentRepository: Repository<SpacePostComment>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  // Create a new space
  async createSpace(data: CreateSpaceDto) {
    const professionalUser = await this.professionalRepository.findOne({
      where: { userId: data.professionalId },
      relations: ['industry'],
    });

    if (!professionalUser) {
      throw new BadRequestException('Professional user does not exist');
    }

    if (!professionalUser.industry) {
      throw new BadRequestException(
        'Professional is not associated with any industry',
      );
    }

    try {
      const newSpace = this.spacesRepository.create({
        name: data.name,
        professionalCoordinator: professionalUser,
        industry: professionalUser.industry,
        maxNumberOfStudents: data.maxNumberOfStudents,
        skillLevel: data.skillLevel,
        description: data.description,
      });

      return await this.spacesRepository.save(newSpace);
    } catch (error) {
      this.logger.error(
        'A problem occurred while trying to create a new space',
        error.stack,
      );
      throw new BadRequestException(
        'Could not create space. Please try again.',
      );
    }
  }

  // Join a space
  async joinSpace(spaceId: number, username: string) {
    const space = await this.spacesRepository.findOne({
      where: { id: spaceId },
      relations: ['studentMembers'],
    });

    if (!space) {
      throw new BadRequestException('Space not found');
    }

    if (space.studentMembers.length >= space.maxNumberOfStudents) {
      throw new BadRequestException('Space has reached its maximum capacity');
    }

    const user = await this.studentRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    try {
      space.studentMembers.push(user);
      return await this.spacesRepository.save(space);
    } catch (error) {
      this.logger.error('A problem occurred while joining the space', error.stack);
      throw new BadRequestException(
        'Could not join space. Please try again.',
      ); 
    }
  }

  // Fetch space details by ID
  async getSpaceById(spaceId: number) {
    try {
      const space = await this.spacesRepository.findOne({
        where: { id: spaceId },
        relations: [
          'professionalCoordinator',
          'industry',
          'studentMembers',
          'posts',
          'events',
        ],
      });

      if (!space) {
        throw new BadRequestException('Space not found');
      }

      return {
        id: space.id,
        name: space.name,
        description: space.description,
        skillLevel: space.skillLevel,
        maxNumberOfStudents: space.maxNumberOfStudents,
        industry: space.industry?.name || null,
        professionalCoordinator: {
          id: space.professionalCoordinator?.userId,
          name: space.professionalCoordinator?.fullname,
        },
        studentMembers: space.studentMembers.map((student) => ({
          id: student.userId,
          username: student.username,
          name: student.fullname,
        })),
        posts: space.posts.map((post) => ({
          id: post.id,
          content: post.content,
          type: post.type,
          mediaUrl: post.mediaUrl,
          createdAt: post.createdAt,
        })),
        events: space.events.map((event) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          calenderUrl: event.calenderUrl,
          date: event.date,
          createdAt: event.createdAt,
        })),
      };
    } catch (error) {
      this.logger.error(
        `A problem occurred while fetching details for space with ID ${spaceId}`,
        error.stack,
      );
      throw new BadRequestException(
        'Could not retrieve space information. Please try again.',
      );
    }
  }

  // Create a post in a space
  async createPostOnSpace(data: spacePostDTO) {
    const space = await this.spacesRepository.findOne({
      where: { id: data.spaceId },
    });

    if (!space) {
      throw new BadRequestException('Space not found');
    }

    const newPost = this.spacePostRepository.create({
      content: data.content,
      mediaUrl: data.mediaUrl,
      type: data.type,
      space: space,
    });

    return await this.spacePostRepository.save(newPost);
  }

  // Reply with a comment on a post
  async replyToPost(data: CreateCommentDTO) {
    const post = await this.spacePostRepository.findOne({
      where: { id: data.postId },
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    const newComment = this.commentRepository.create({
      content: data.content,
      post: post,
      authorId: data.authorId,
    });

    return await this.commentRepository.save(newComment);
  }

  // Schedule an event in a space
  async scheduleEvent(data: ScheduleEventDTO) {
    const space = await this.spacesRepository.findOne({
      where: { id: data.spaceId },
    });

    if (!space) {
      throw new BadRequestException('Space not found');
    }

    const newEvent = this.eventRepository.create({
      title: data.title,
      description: data.description,
      calenderUrl: data.calenderUrl,
      date: data.date,
      space: space,
    });

    return await this.eventRepository.save(newEvent);
  }

  // Fetch events in a space
  async getEventsInSpace(spaceId: number) {
    const events = await this.eventRepository.find({
      where: { space: { id: spaceId } },
    });

    if (!events.length) {
      throw new BadRequestException('No events found for this space');
    }

    return events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      calenderUrl: event.calenderUrl,
      date: event.date,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    }));
  }
}
