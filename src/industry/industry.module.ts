import { Module } from '@nestjs/common';
import { IndustryService } from './industry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Industry } from 'src/entities/industry.entity';
import { Faculty } from 'src/entities/faculty.entity';
import { IndustryController } from './industry.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Industry, Faculty])],
  providers: [IndustryService],
  exports: [IndustryService],
  controllers: [IndustryController]
})
export class IndustryModule {}
