import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from "typeorm";
import { Student } from "./student.entity";
import { Professional } from "./professional.entity";

@Entity()
export class Social {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Student, (student) => student.socials)
    @OneToOne(() => Professional, (professional) => professional.socials) 
    user: Student | Professional
}