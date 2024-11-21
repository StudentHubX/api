import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { CreatePostDto } from './dto/post.dto';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}
    @Post('/create')
    async post(@Body() data: CreatePostDto) {
        return this.postsService.createPost(data)
    }

    @Get(':id')
    async viewPost(@Param() id:string) {
        return this.postsService.getPost(id)
    }
}
