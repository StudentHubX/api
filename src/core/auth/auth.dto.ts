import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
export class CreateUserDto {
    @IsString()
    fullname: string

    @IsString()
    username: string

    @IsString()
    country: string

    @IsNumber()
    facultyId?: number

    @IsString()
    email: string

    @IsNumber()
    age: number
    
    @IsString()
    password: string

    @IsString()
    gender: string

    @IsNumber()
    yearsOfExperience?: number

    @IsString() 
    nameOfOrganization?: string

    @IsString()
    role?: string

    @IsNumber()
    industryId: number
}