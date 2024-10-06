import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Student } from './student.entity'
import { Professional } from './professional.entity'


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
}