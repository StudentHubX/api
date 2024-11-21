import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/entities/post.entity';
import { CreatePostDto } from './dto/post.dto';
import { AiService } from 'src/ai/ai.service';
import { Professional } from 'src/entities/professional.entity';
import { Student } from 'src/entities/student.entity';
import { Industry } from 'src/entities/industry.entity';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    private readonly aiService: AiService,

    @InjectRepository(Industry)
    private readonly industryRepository: Repository<Industry>
  ) {}

  async getPost(id: string): Promise<Post | Error> {
    const idToUse = Number(id);
    if (isNaN(idToUse)) {
      return new Error('Invalid post ID');
    }

    const post = await this.postRepository.findOne({ where: { id: idToUse } });
    return post || new Error('Post not found');
  }

  async createPost(data: CreatePostDto): Promise<Post | Error> {
    const { isStudent, authorId, title, content } = data;
    let author: Student | Professional | null = null;
    let industry: Industry | null = null;

    if (isStudent) {
        // Fetch the student with their faculty and industries
        author = await this.studentRepository.findOne({
            where: { userId: authorId },
            relations: ['faculty', 'faculty.industries'],
        });

        if (!author || !author.faculty || author.faculty.industries.length === 0) {
            this.logger.error(`Industry not found for student with userId ${authorId}`);
            return new Error('Industry not found for the student');
        }

        // Set industry to the first industry in faculty.industries
        industry = author.faculty.industries[0];
    } else {
        // Fetch the professional with their associated industry
        author = await this.professionalRepository.findOne({
            where: { userId: authorId },
            relations: ['industry'],
        });

        if (!author || !author.industry) {
            this.logger.error(`Industry not found for professional with userId ${authorId}`);
            return new Error('Industry not found for the professional');
        }

        // Set industry directly from professional's industry
        industry = author.industry;
    }

    if (!author) {
        this.logger.error(`Author with userId ${authorId} not found`);
        return new Error('Author not found');
    }

    this.logger.debug(
        `Creating post for authorId ${author.userId} in industry ${industry.id}`,
    );

    const newPost = this.postRepository.create({
        title,
        content,
        industry, // Reference the industry directly
        // Set the appropriate relationship (either student or professional)
        student: isStudent ? author as Student : null,
        professional: !isStudent ? author as Professional : null,
    });

    try {
        return await this.postRepository.save(newPost);
    } catch (error) {
        this.logger.error('Error saving the post:', error);
        return new Error('Failed to create post');
    }
}

}
