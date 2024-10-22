import { IsString, IsNumber, IsArray } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class ResourceDto {
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    link: string

    @IsArray()
    industryIds: number[]

    @IsString()
    type: string

    @IsString()
    topicName: string
}