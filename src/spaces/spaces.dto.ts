import { IsNumber, IsString, IsEnum } from "class-validator";

export class CreateSpaceDto {
    @IsString()
    name: string

    @IsNumber()
    professionalId: number

    @IsNumber()
    maxNumberOfStudents: number
}

export class spacePostDTO {
    @IsString()
    content: string

    @IsString()
    type: 'text' | 'image' | 'video'

    @IsString()
    mediaUrl?: string

    @IsNumber()
    spaceId: number
}