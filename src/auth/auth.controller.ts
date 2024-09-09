import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResult, AuthService } from './auth.service';
import { UserEntity } from 'src/entity/user.entity';

type AuthInput = { username: string; password: string };
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('signup') 
    async signUp(@Body() input:UserEntity): Promise<AuthResult | Error> {
        return await this.authService.signUp(input)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login') 
    async login(@Body() input:AuthInput): Promise<AuthResult | Error> {
        return await this.authService.login(input)
    }

}
