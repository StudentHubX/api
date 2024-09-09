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
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  fullname: string;

  @Column()
  username: string;

  @Column()
  age: number;

  @Column()
  schoolId: number;

  @ManyToOne(() => Department, (department) => department.users)
  department: Department;

  @Column()
  country: string;

  @Column()
  password: string;

  @Column()
  gender: string

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];


}
