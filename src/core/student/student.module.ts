import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/student.entity';
import { FacultiesModule } from 'src/faculties/faculties.module';
import { Faculty } from 'src/entities/faculty.entity';
import { Post } from 'src/entities/post.entity';
import { Spaces } from 'src/entities/spaces.entity';

@Module({
  imports: [FacultiesModule,TypeOrmModule.forFeature([Student, Post, Spaces])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
