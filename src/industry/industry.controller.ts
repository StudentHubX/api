import { Controller, Get } from '@nestjs/common';
import { IndustryService } from './industry.service';

@Controller('industry')
export class IndustryController {
    constructor(private readonly industryService: IndustryService){}

    @Get('')
    async create() {
        await this.industryService.createIndustries()
    }
}
