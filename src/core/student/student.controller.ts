import {
  Controller,
  UseGuards,
  Request,
  Get,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthGuard } from 'src/guards/auth-guard';
import { FacultiesService } from 'src/faculties/faculties.service';
import { Post as postEntity } from 'src/entities/post.entity';
import { Social } from 'src/entities/student.entity';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly facultiesService: FacultiesService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req):Promise<{username:  string, socials: Social[], fullname: string, email: string, id: number, country: string, faculty: string}> {
    return this.studentService.fetchUser(req.user.username);
  }

  @UseGuards(AuthGuard)
  @Get('feed')
  getFeed(@Request() req) {
    return this.studentService.feed(req.user.sub, 10);
  }

  @UseGuards(AuthGuard)
  @Get('/spaces')
  getSpaces(@Request() req) {
    return this.studentService.getSpaces(req.body.sub)
  }
  @UseGuards(AuthGuard)
  @Post('addSocial')
  addSocial(
    @Request() req,
    @Body() input: { type: 'INSTAGRAM' | 'X'; username: string }[],
  ) {
    return this.studentService.addSocialToUser(req.user.sub, input);
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
