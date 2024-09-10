import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
  } from 'typeorm';
  import { Post } from './post.entity';
  import { Department } from './department.entity';
  
  @Entity()
  export class Professional {
    @PrimaryGeneratedColumn()
    userId: number;
  
    @Column()
    fullname: string;
  
    @Column()
    username: string;
  
    @Column()
    age: number;

    @Column()
    yearsOfExperience: number

    @Column()
    nameOfOrganization: string

    @Column()
    role: string
  
    @Column()
    country: string;
  
    @Column()
    password: string;
  
    @Column()
    gender: string
  
    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];
  
  }
  