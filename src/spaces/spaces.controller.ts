import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './spaces.dto';
import { AuthGuard } from 'src/guards/auth-guard';

@Controller('spaces')
export class SpacesController {
    constructor (private readonly spacesService: SpacesService) {}
    @Post('create')
    async create(@Body() data:CreateSpaceDto) {
        await this.spacesService.createSpace(data)
    }

    @UseGuards(AuthGuard)
    @Post('joinSpace/:id')
    async joinSpace(@Param('id') id:string, @Request() req) {
        await this.spacesService.joinSpace(id as unknown as number, req.user.username)
    }
}