import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { IndustryModule } from 'src/industry/industry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from 'src/entities/professional.entity';
import { Post } from 'src/entities/post.entity';
import { Spaces } from 'src/entities/spaces.entity';

@Module({
  imports: [IndustryModule, TypeOrmModule.forFeature([Professional, Post, Spaces])],
  providers: [ProfessionalService],
  controllers: [ProfessionalController]
})
export class ProfessionalModule {}
