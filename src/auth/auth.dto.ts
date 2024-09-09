import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Department } from 'src/entity/department.entity';

export class CreateUserDto {
    @IsString()
    fullname: string

    @IsString()
    username: string

    @IsString()
    country: string

    @IsNumber()
    departmentId: number

    @IsNumber()
    age: number

    @IsNumber()
    schoolId: number

    @IsString()
    password: string

    @IsString()
    gender: string
}