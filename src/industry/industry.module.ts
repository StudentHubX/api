import { Module } from '@nestjs/common';
import { IndustryService } from './industry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Industry } from 'src/entity/industry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Industry])],
  providers: [IndustryService],
  exports: [IndustryService]
})
export class IndustryModule {}
