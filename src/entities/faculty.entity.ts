import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
  } from 'typeorm';
  import { Student } from './student.entity';
  import { Industry } from './industry.entity';
  
  @Entity()
  export class Faculty {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({unique: true})
    name: string;
  
    @OneToMany(() => Student, (user) => user.faculty)
    users: Student[];
  
    @ManyToOne(() => Industry, (industry) => industry.departments)
    industry: Industry;
  }
  