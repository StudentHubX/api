import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from 'src/entities/resource.entity';
import { Professional } from 'src/entities/professional.entity';
import { Student } from 'src/entities/student.entity';
import { Badge } from 'src/entities/badge.entity';
import { Topic } from 'src/entities/topics.entity';
import { Industry } from 'src/entities/industry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, Professional, Student, Badge, Topic, Industry])],
  providers: [ResourcesService],
  controllers: [ResourcesController]
})
export class ResourcesModule {}
