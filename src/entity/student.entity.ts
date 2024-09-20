import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Post } from './post.entity';
import { Department } from './department.entity';
import { Spaces } from './spaces.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
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
  gender: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  // Relations with Room
  @OneToMany(() => Spaces, (room) => room.studentCoordinator)
  coordinatedSpaces: Spaces[];

  @ManyToOne(() => Spaces, (room) => room.studentMembers)
  spaces: Spaces[];
}
