import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from '../../entities/professional.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/entities/post.entity';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(Professional)
    private usersRepository: Repository<Professional>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findUserByUsername(
    username: string,
  ): Promise<Professional | undefined> {
    return await this.usersRepository.findOne({ where: { username } });
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
}
