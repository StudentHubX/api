import { Body, Controller, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { AuthResult, AuthService } from './auth.service';
import { CreateUserDto } from './auth.dto';

type AuthInput = { username: string; password: string };
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('signup') 
    async signUp(@Body() input:CreateUserDto, @Query('type') type: string): Promise<AuthResult | Error> {
        if(type == "STUD") {
            return await this.authService.studentSignUp(input)
        }
        return await this.authService.professionalSignUp(input)
    }

    @HttpCode(HttpStatus.OK)
    @Post('login') 
    async login(@Body() input:AuthInput,@Query('type') type: string): Promise<AuthResult | Error> {
        if(type == "STUD") {
            return await this.authService.studentLogin(input)
        }
        return await this.authService.professionalLogin(input)
    }

}
