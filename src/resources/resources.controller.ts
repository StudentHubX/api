import { Body, Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourceDto } from './resource.dto';
import { AuthGuard } from 'src/guards/auth-guard';

@Controller('resources')
export class ResourcesController {
    constructor(private readonly resourceService: ResourcesService) {}
    @UseGuards(AuthGuard)
    @Get('create')
    async createResource(@Request() req, @Body() input: ResourceDto) {
        return this.resourceService.createResource(input, req.user.sub)
    }
}
