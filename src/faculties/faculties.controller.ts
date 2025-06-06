import { Controller, Get, Param } from '@nestjs/common';
import { FacultiesService } from './faculties.service';

@Controller('faculties')
export class FacultiesController {
    constructor(private readonly facultyService: FacultiesService) {}

    @Get('')
    async create() {
        await this.facultyService.createFaculty()
    }
    @Get(':facultyId')
    async getallUsers(@Param('facultyId') facultyId: number) {
        return this.facultyService.findUsers(facultyId)
    }
}
