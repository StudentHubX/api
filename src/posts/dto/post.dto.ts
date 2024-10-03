// src/modules/post/dto/create-post.dto.ts
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreatePostDto {
  @IsBoolean()
  isStudent: boolean

  @IsString()
  type: "FLASHCARD" | "POST"
  
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  authorId: number;  
}
