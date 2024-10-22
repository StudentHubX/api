import { Body, Controller, HttpCode, HttpStatus, Post, Query, BadRequestException, Logger } from '@nestjs/common';
import { AuthResult, AuthService } from './auth.service';
import { CreateUserDto } from './auth.dto';

type AuthInput = { username: string; password: string };

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    async signUp(@Body() input: CreateUserDto, @Query('type') type: string): Promise<Error | AuthResult> {
        if (!type || (type !== 'STUD' && type !== 'PROF')) {
            throw new BadRequestException('Invalid type parameter. Must be "STUD" or "PROF".');
        }

        try {
            if (type === 'STUD') {
                 return await this.authService.studentSignUp(input);
            }
             return await this.authService.professionalSignUp(input);
        } catch (error) {
            this.logger.error('Error during signup', error.stack);
            throw new BadRequestException('Signup failed. Please try again.');
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() input: AuthInput, @Query('type') type: string): Promise<Error | AuthResult> {
        if (type === 'STUD') {
            return await this.authService.studentLogin(input);
        }
        return await this.authService.professionalLogin(input);
    }
}