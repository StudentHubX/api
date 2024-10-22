import { IsNumber, IsString } from "class-validator";

export class CreateSpaceDto {
    @IsString()
    name: string

    @IsNumber()
    professionalId: number
}