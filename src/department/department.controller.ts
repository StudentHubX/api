import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {

    }
    @Get('')
    async createAll() {
         await this.departmentService.create()
         console.log('done')
    }

    @Get(':departmentId')
    async findUsers(@Param('departmentId') departmentId: number) {
        return await this.departmentService.findUsers(departmentId)
    }

}
