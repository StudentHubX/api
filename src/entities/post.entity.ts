import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn} from 'typeorm'
import { Student } from './student.entity'
import { Professional } from './professional.entity'
import { Faculty } from './faculty.entity'
import { Industry } from './industry.entity'


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title?: string

    @Column()
    content: string

    @Column()
    type: "FLASHCARD" | "POST" 

    @ManyToOne(() => Student,(user) => user.posts)
    @ManyToOne(() => Professional, (user) => user.posts)
    author: Student | Professional

    @ManyToOne(() => Industry, (industry) => industry.posts)
    industry: Industry

    @CreateDateColumn()
    createdAt: Date;
}