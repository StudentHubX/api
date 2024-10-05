import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { IndustryModule } from 'src/industry/industry.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from 'src/entities/professional.entity';

@Module({
  imports: [IndustryModule, TypeOrmModule.forFeature([Professional])],
  providers: [ProfessionalService],
  controllers: [ProfessionalController]
})
export class ProfessionalModule {}
