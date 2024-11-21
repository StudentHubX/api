import { Module } from '@nestjs/common';
import { FacultiesService } from './faculties.service';
import { FacultiesController } from './faculties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faculty } from 'src/entities/faculty.entity';
import { Industry } from 'src/entities/industry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty, Industry])],
  providers: [FacultiesService],
  controllers: [FacultiesController],
  exports: [FacultiesService]
})
export class FacultiesModule {}
