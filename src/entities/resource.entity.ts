import { Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Student } from "./student.entity";
import { Professional } from "./professional.entity";

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    title: string

    @Column()
    link: string

    @Column()
    description: string

    @Column({ type: 'string' })
  authorType: string; // either 'Author' or 'Administrator'


    @ManyToOne(() => Student, (student) => student.resources,{ onDelete: 'CASCADE' })
    @ManyToOne(()=> Professional, (professional) => professional.resources, { onDelete: 'CASCADE' })
    author: Student | Professional
}