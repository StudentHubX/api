import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Post } from './post.entity';
import { Department } from './department.entity';
import { Spaces } from './spaces.entity';
import { Resource } from './resource.entity';
import { Badge } from './badge.entitiy';
import { Faculty } from './faculty.entity';

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

  @ManyToOne(() => Faculty, (faculty) => faculty.users)
  faculty: Faculty;

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
  
  @OneToMany(() => Resource, (resources) => resources.author)
  resources: Resource[]

  @ManyToMany(() => Badge, (badge) => badge.id)
  @JoinTable()
  badges: Badge[]
}
