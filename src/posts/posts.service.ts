import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/entity/post.entity';
import { CreatePostDto } from './dto/post.dto';
import { AiService } from 'src/ai/ai.service';
import { CreateUserDto } from 'src/core/auth/auth.dto';
import { Professional } from 'src/entity/professional.entity';
import { Student } from 'src/entity/student.entity';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(Professional)
    private professionalRepository: Repository<Professional>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    private readonly aiService: AiService,
  ) {}

  async createPost(data: CreatePostDto): Promise<Post | Error> {
    const { isStudent, type, authorId, title, content } = data;
    let author: Student | Professional;

    !isStudent
      ? (author = await this.professionalRepository.findOne({
          where: { userId: authorId },
        }))
      : (author = await this.studentRepository.findOne({
          where: { userId: authorId },
        }));

    // const isQualityEnough = await this.aiService.validatePost(content) as unknown as boolean

    // if(!isQualityEnough) {
    //     return new Error(`Post does not meet moderator's standards`)
    // }
    if (!author) {
      return new Error('Author not found');
    }

    const newPost = this.postRepository.create({
      title: title,
      content: content,
      author: author,
      type: type,
    });

    return await this.postRepository.save(newPost);
  }
}
