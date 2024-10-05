import { Controller, UseGuards, Request, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthGuard } from 'src/guards/auth-guard';
import { FacultiesService } from 'src/faculties/faculties.service';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly facultiesService: FacultiesService,
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
    return this.facultiesService.findUsers(id as unknown as number);
  }
}
