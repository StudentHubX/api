import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Professional } from './professional.entity';
import { Spaces } from './spaces.entity';

import { Faculty } from './faculty.entity';
import { Topic } from './topics.entity';
import { Post } from './post.entity';

@Entity('industry')
export class Industry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Professional, (user) => user.industry)
  users: Professional[];

  @OneToMany(() => Spaces, (room) => room.industry)
  spaces: Spaces[];

  @ManyToMany(() => Faculty, (faculty) => faculty.industries)
  @JoinTable()
  faculties: Faculty[];

  @ManyToMany(() => Topic, (topic) => topic.industries)
  topics: Topic[];

  @OneToMany(() => Post, (post) => post.industry)
  posts: Post[];
}
