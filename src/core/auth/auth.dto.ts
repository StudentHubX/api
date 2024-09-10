import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { Department } from 'src/entity/department.entity';

export class CreateUserDto {
    @IsBoolean()
    isStudent: boolean

    @IsString()
    fullname: string

    @IsString()
    username: string

    @IsString()
    country: string

    @IsNumber()
    departmentId?: number

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