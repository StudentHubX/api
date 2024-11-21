import { Module } from '@nestjs/common';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spaces } from 'src/entities/spaces.entity';
import { Professional } from 'src/entities/professional.entity';
import { Student } from 'src/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professional, Student, Spaces])],
  controllers: [SpacesController],
  providers: [SpacesService]
})
export class SpacesModule {}
