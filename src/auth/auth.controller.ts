import { Body, Controller, HttpCode, HttpStatus, NotImplementedException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/entity/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('signup') 
    async signUp(@Body() input:UserEntity): Promise<UserEntity> {
        return await this.authService.signUp(input)
    }

}
