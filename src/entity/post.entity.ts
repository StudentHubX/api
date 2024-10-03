import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { UserEntity } from './user.entity'
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
    author: Student

    @ManyToOne(() => Professional, (user) => user.posts)
    ProfAuthor: Professional
}