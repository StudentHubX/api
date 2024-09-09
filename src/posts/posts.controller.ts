import { Controller, Get, Body, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/post.dto';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}
    @Post('/create')
    async post(@Body() data: CreatePostDto) {
        return this.postsService.createPost(data)
    }
}
