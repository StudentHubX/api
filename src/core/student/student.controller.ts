import { Controller, UseGuards, Request, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthGuard } from 'src/guards/auth-guard';
import { FacultiesService } from 'src/faculties/faculties.service';
import { Post } from 'src/entities/post.entity';



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

  @UseGuards(AuthGuard)
  @Get('feed')
  getFeed(@Request() req) {
    return this.studentService.feed(req.user.sub,  10);

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
