import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/entity/post.entity';
import { CreatePostDto } from './dto/post.dto';
import { AiService } from 'src/ai/ai.service';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly aiService: AiService
  ) {}

  async createPost(data: CreatePostDto): Promise<Post | Error> {
    const {authorId, title, content} = data

    const author = await this.userRepository.findOne({where: {userId: authorId}})

    const isQualityEnough = await this.aiService.validatePost(content) as unknown as boolean

    if(!author) {
        return new Error('Author not found')
    }

    if(!isQualityEnough) {
        return new Error(`Post does not meet moderator's standards`)
    }

    const newPost = this.postRepository.create({
        title: title,
        content: content,
        author: author
    })

    return await this.postRepository.save(newPost)
  }
}
