// src/modules/post/dto/create-post.dto.ts
import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsBoolean()
  isStudent: boolean
  
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  authorId: number; 
  
  @IsNumber()
  industryId: number
}
