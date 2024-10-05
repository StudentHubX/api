import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { Student } from './student.entity';
import { Industry } from './industry.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.department)
  users: Student[];

  @ManyToOne(() => Industry, (industry) => industry.departments)
  industry: Industry;
}
