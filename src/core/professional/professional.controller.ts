import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth-guard';
import { IndustryService } from 'src/industry/industry.service';
import { ProfessionalService } from './professional.service';
@Controller('professional')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService, private readonly industryService: IndustryService) {}
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
    @Get(':username')
    async findUser(@Param() username: string) {
      return this.professionalService.findUserByUsername(username);
    }
  
    @Get(':department')
    async findUsersOnDepartment(@Param() id: string) {
      return this.industryService.findUsers(id as unknown as number);
    }
}
