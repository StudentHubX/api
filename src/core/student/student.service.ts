import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../../entities/student.entity';
import { Repository } from 'typeorm';
import { Faculty } from 'src/entities/faculty.entity';
import { Industry } from 'src/entities/industry.entity';
import { Post } from 'src/entities/post.entity';

interface Social {
  type: 'INSTAGRAM' | 'X';
  username: string;
}

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private usersRepository: Repository<Student>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async findUserByUsername(username: string): Promise<Student | undefined> {
    return await this.usersRepository.findOne({ where: { username } });
  }
  async fetchUser(username: string): Promise<{username:  string, socials: Social[], fullname: string, email: string, id: number, country: string}> {

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
        socials: user.socials
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

  async addSocialToUser(
  
    loggedInUserId: number,
    socials: Social[],
  ) {
    try {
      // Find the user by userId
      const user = await this.usersRepository.findOne({ where: { userId: loggedInUserId } });

      if (!user) {
        throw new Error('User not found');
      }

      user.socials = socials;
      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      console.error('Error adding social to user:', error);
      throw new Error('Failed to add social profile');
    }
  }

  async feed(userId: number, limit: number) {
    const user = await this.usersRepository.findOne({
      where: { userId: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const userIndustry = user.faculty.industries;

    const userRecommendedPosts = await this.postRepository
      .createQueryBuilder('post')
      .where('post.industry IN (:...userIndustries)', {
        userIndustries: userIndustry,
      }) // Using IN clause for multiple industries
      .orderBy('post.createdAt', 'DESC')
      .limit(limit)
      .getMany();
    return userRecommendedPosts;
  }
}
