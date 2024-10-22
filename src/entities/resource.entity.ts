import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Student } from './student.entity';
import { Professional } from './professional.entity';
import { Topic } from './topics.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @Column()
  authorType: string;

  @Column()
  type: string

  @ManyToOne(() => Student, (student) => student.resources, {
    onDelete: 'CASCADE',
  })
  @ManyToOne(() => Professional, (professional) => professional.resources, {
    onDelete: 'CASCADE',
  })
  author: Student | Professional;

  @ManyToOne(()=> Topic, (topic) => topic.resources)
  topic: Topic
}
