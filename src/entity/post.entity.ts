import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { UserEntity } from './user.entity'


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @ManyToOne(() => UserEntity,(user) => user.posts)
    author: UserEntity
}