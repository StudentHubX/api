import { Controller, UseGuards, Request, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/guards/auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get(':username')
  async findUser(@Param() username:string) {
    return this.UsersService.findUserByUsername(username)
  }
}
