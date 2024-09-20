import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { AiModule } from 'src/ai/ai.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entity/post.entity';
import { Professional } from 'src/entity/professional.entity';
import { Student } from 'src/entity/student.entity';

@Module({
  imports: [AiModule, TypeOrmModule.forFeature([Post, Professional, Student])],
  providers: [ PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
