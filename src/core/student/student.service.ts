import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../../entities/student.entity';
import { Repository } from 'typeorm';
import { Faculty } from 'src/entities/faculty.entity';
import { Industry } from 'src/entities/industry.entity';
import { Post } from 'src/entities/post.entity';

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
  async fetchUser(userPayload) {
    const user = await this.usersRepository.findOne({where: {username: userPayload.username}})
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
