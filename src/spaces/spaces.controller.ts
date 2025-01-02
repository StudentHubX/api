import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import {
  CreateSpaceDto,
  spacePostDTO,
  CreateCommentDTO,
  ScheduleEventDTO,
} from './spaces.dto';
import { AuthGuard } from 'src/guards/auth-guard';

@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  // Create a new space
  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Request() req, @Body() data: CreateSpaceDto) {
    await this.spacesService.createSpace({
      name: data.name,
      description: data.description,
      maxNumberOfStudents: data.maxNumberOfStudents,
      skillLevel: data.skillLevel,
      professionalId: req.user.sub,
    });
  }

  // Join a space
  @UseGuards(AuthGuard)
  @Post('joinSpace/:id')
  async joinSpace(@Param('id') id: string, @Request() req) {
    await this.spacesService.joinSpace(
      id as unknown as number,
      req.user.username,
    );
  }

  // Fetch space details by ID
  @Get(':id')
  async getSpace(@Param('id') id: string) {
    return this.spacesService.getSpaceById(id as unknown as number);
  }

  // Create a post in a space
  @UseGuards(AuthGuard)
  @Post('posts/create')
  async createPost(@Body() data: spacePostDTO) {
    return this.spacesService.createPostOnSpace(data);
  }

  // Reply to a post in a space
  @UseGuards(AuthGuard)
  @Post('posts/:postId/reply')
  async replyToPost(@Param('postId') postId: string, @Body() data: CreateCommentDTO) {
    return this.spacesService.replyToPost({
      ...data,
      postId: postId as unknown as number,
    });
  }

  // Schedule an event in a space
  @UseGuards(AuthGuard)
  @Post('events/schedule')
  async scheduleEvent(@Body() data: ScheduleEventDTO) {
    return this.spacesService.scheduleEvent(data);
  }

  // Fetch events in a space
  @Get(':id/events')
  async getEvents(@Param('id') id: string) {
    return this.spacesService.getEventsInSpace(id as unknown as number);
  }
}
