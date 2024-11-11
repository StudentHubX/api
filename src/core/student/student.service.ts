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
  async fetchUser(username: string): Promise<{username:  string, socials: Social[], fullname: string, email: string, id: number, country: string, isStudent: boolean}> {

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
        isStudent: true
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
    // Load the user with faculty and industries relations
    const user = await this.usersRepository.findOne({
      where: { userId: userId },
      relations: ['faculty', 'faculty.industries'], // Ensure 'faculty' and its industries are loaded
    });
  
    // Check if user and user.faculty exist
    if (!user || !user.faculty) {
      throw new Error('User or faculty not found');
    }
  
    // Extract industry IDs from the user's faculty industries
    const userIndustryIds = user.faculty.industries.map(industry => industry.id);
  
    // Query to get posts with related student and professional entities
    const userRecommendedPosts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.student', 'student') // Include the student relation
      .leftJoinAndSelect('post.professional', 'professional') // Include the professional relation
      .where('post.industryId IN (:...userIndustryIds)', {
        userIndustryIds, // Pass only industry IDs
      })
      .orderBy('post.createdAt', 'DESC')
      .limit(limit)
      .getMany();
  
    return userRecommendedPosts;
  }
  
}  
