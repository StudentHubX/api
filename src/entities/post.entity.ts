import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn} from 'typeorm'
import { Student } from './student.entity'
import { Professional } from './professional.entity'
import { Faculty } from './faculty.entity'
import { Industry } from './industry.entity'


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => Student, (student) => student.posts, { nullable: true })
    student: Student | null;

    @ManyToOne(() => Professional, (professional) => professional.posts, { nullable: true })
    professional: Professional | null;

    @ManyToOne(() => Industry, (industry) => industry.posts)
    industry: Industry;

    @CreateDateColumn()
    createdAt: Date;
}