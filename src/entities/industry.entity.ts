import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Professional } from './professional.entity';
import { Spaces } from './spaces.entity';

import { Faculty } from './faculty.entity';
import { Topic } from './topics.entity';

@Entity('industry')
export class Industry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Professional, user => user.industry)
  users: Professional[];

  @OneToMany(() =>  Spaces, (room ) => room.industry)
  spaces: Spaces[]

  @OneToMany(() => Faculty, (faculty) => faculty.industry)
    faculties: Faculty[];

  @ManyToMany(() => Topic, (topic) => topic.industries)
  topics: Topic[]
}
