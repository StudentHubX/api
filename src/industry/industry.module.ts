import { Module } from '@nestjs/common';
import { IndustryService } from './industry.service';

@Module({
  providers: [IndustryService]
})
export class IndustryModule {}
