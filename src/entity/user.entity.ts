import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

type UserT = {
    userId: number,
    fullname: string,
    username: string,
    age: number,
    schoolId: string,
    country: string,
    password: string
}


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId: number

    @Column()
    fullname: string

    @Column()
    username: string

    @Column()
    age: number

    @Column()
    schoolId: string

    @Column()
    department: string

    @Column()
    country: string

    @Column()
    password: string

    
    
}