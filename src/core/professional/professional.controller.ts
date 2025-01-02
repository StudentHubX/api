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
      return this.professionalService.fetchUser(req.user.username);
    }
    @UseGuards(AuthGuard)
    @Get('spaces')
    async getSpaces(@Request() req) {
      return this.professionalService.getSpaces(req.user.sub);
    }
    @Get(':username')
    async findUser(@Param() username: string) {
      return this.professionalService.findUserByUsername(username);
    }
  
    @Get(':industry')
    async findUsersOnDepartment(@Param() industry: string) {
      return this.industryService.findUsers(industry as unknown as number);
    }

    
}
