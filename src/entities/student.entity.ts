import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { Post } from './post.entity';
import { Spaces } from './spaces.entity';
import { Resource } from './resource.entity';
import { Badge } from './badge.entity';
import { Faculty } from './faculty.entity';


export interface Social {
  username: string,
  type: 'INSTAGRAM' | 'X'

}

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string

  @Column()
  fullname: string;

  @Column({ unique: true })
  username: string;

  @Column()
  age: number;

  @ManyToOne(() => Faculty, (faculty) => faculty.users)
  faculty: Faculty;

  @Column()
  country: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @OneToMany(() => Post, (post) => post.student)
  posts: Post[];

  @ManyToOne(() => Spaces, (room) => room.studentMembers)
  spaces: Spaces[];
  
  @OneToMany(() => Resource, (resources) => resources.author)
  resources: Resource[]

  @ManyToMany(() => Badge, (badge) => badge.id)
  @JoinTable()
  badges: Badge[]

  @Column({ type: 'jsonb', nullable: true })
  socials: Social[]
}
