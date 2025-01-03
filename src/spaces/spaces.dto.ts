import { IsNumber, IsString, IsEnum } from "class-validator";

export class CreateSpaceDto {
    @IsString()
    name: string

    @IsNumber()
    professionalId: number
    
    @IsString()
    description: string

    @IsNumber()
    maxNumberOfStudents: number

    @IsString()
    skillLevel: 'beginner' | 'intermediate' | 'advanced'
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
export class CreateCommentDTO {
    postId: number;
    content: string;
    authorId: number; // Optional if tracking commenter
  }

  export class ScheduleEventDTO {
    spaceId: number;
    title: string;
    description: string;
    calenderUrl: string;
    date: Date;
  }
  