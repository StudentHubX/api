import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Post } from './post.entity';
import { Industry } from './industry.entity';
import { Spaces } from './spaces.entity';

@Entity()
export class Professional {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  username: string;

  @Column()
  age: number;

  @Column()
  yearsOfExperience: number;

  @Column()
  nameOfOrganization: string;

  @Column()
  role: string;

  @Column()
  country: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
  
  @ManyToOne(()=> Industry, (industry) => industry.users)
  industry: Industry

  // Relations with Room
  @OneToMany(() => Spaces, (room) => room.professionalCoordinator)
  coordinatedSpaces: Spaces[];

  @ManyToOne(() => Spaces, (room) => room.professionalMembers)
  spaces: Spaces[];
}
