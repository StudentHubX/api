import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { Post } from './post.entity';
import { Industry } from './industry.entity';
import { Spaces } from './spaces.entity';
import { Resource } from './resource.entity';
import { Badge } from './badge.entity';
import { Social } from './social.entity';

@Entity()
export class Professional {
  @PrimaryGeneratedColumn()
  userId: number;
  
  @Column()
  email:  string;

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
  
  @OneToMany(() => Spaces, (room) => room.professionalCoordinator)
  coordinatedSpaces: Spaces[];

  @OneToMany(()=> Resource, (resource) => resource.author)
  resources: Resource[]

  @ManyToMany(() => Badge, (badge) => badge.id)
  @JoinTable()
  badges: Badge[]

  @OneToOne(() => Social, (social) => social.user)
  socials: Social[]
}
