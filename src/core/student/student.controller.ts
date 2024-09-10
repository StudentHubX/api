import { Controller, UseGuards, Request, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthGuard } from 'src/guards/auth-guard';
import { DepartmentService } from 'src/department/department.service';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly departmentService: DepartmentService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get(':username')
  async findUser(@Param() username: string) {
    return this.studentService.findUserByUsername(username);
  }

  @Get(':department')
  async findUsersOnDepartment(@Param() id: string) {
    return this.departmentService.findUsers(id as unknown as number);
  }
}
