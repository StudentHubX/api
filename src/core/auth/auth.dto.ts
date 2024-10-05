import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { Department } from 'src/entities/department.entity';

export class CreateUserDto {
    @IsString()
    fullname: string

    @IsString()
    username: string

    @IsString()
    country: string

    @IsNumber()
    facultyId?: number



    @IsNumber()
    age: number

    @IsNumber()
    schoolId?: number

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