import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from '../../entities/professional.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/entities/post.entity';
import { Social } from 'src/entities/student.entity';
import { Spaces } from 'src/entities/spaces.entity';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(Professional)
    private usersRepository: Repository<Professional>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Spaces)
    private spacesRepository: Repository<Spaces>,
  ) {}

  async findUserByUsername(
    username: string,
  ): Promise<Professional | undefined> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async fetchUser(username: string): Promise<{
    username: string;
    socials: Social[];
    fullname: string;
    email: string;
    id: number;
    country: string;
    isStudent: boolean;
    role: string;
    organization: string;
  }> {
    try {
      const user = await this.usersRepository.findOne({
        where: { username: username },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return {
        username: user.username,
        email: user.email,
        fullname: user.fullname,
        id: user.userId,
        country: user.country,
        socials: user.socials,
        isStudent: false,
        role: user.role,
        organization: user.nameOfOrganization,
      };
    } catch (error) {
      console.error('Error fetching user:', error);

      // Handle different types of errors if needed
      if (error.message === 'User not found') {
        throw new Error('User not found');
      } else {
        throw new Error('An error occurred while fetching the user');
      }
    }
  }
  async getFeed(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { userId: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }
    const userIndustry = user.industry;
    const userRecommendedPosts = await this.postRepository
      .createQueryBuilder('post')
      .where('post.industry = userIndustry', { userIndustry: userIndustry })
      .orderBy('post.createdAt', 'DESC')
      .limit(10)
      .getMany();

    return userRecommendedPosts;
  }
  async getSpaces(professionalId: number) {
    console.log(professionalId)
    const professional = await this.usersRepository.findOne({
      where: { userId: professionalId },
    });

    if (!professional) {
      throw new Error('Professional not found');
    }

    try {
      const spaces = await this.spacesRepository
        .createQueryBuilder('spaces')
        .select([
          'spaces.id',
          'spaces.name',
          'spaces.description',
          'spaces.skillLevel',
        ])
        .where('spaces.professionalCoordinatorUserId = :professionalId', {
          professionalId: professional.userId,
        })
        .getMany();
      return spaces
    } catch (error) {
      console.error('Error fetching spaces:', error.message);
      throw new Error('Failed to fetch spaces');
    }
  }
}
