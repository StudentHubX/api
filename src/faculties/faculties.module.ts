import { Module } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { FacultiesController } from './faculties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculty } from 'src/entities/faculty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty])],
  providers: [FacultiesService],
  controllers: [FacultiesController]
})
export class FacultiesModule {}
