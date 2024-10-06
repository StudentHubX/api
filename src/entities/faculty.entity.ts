import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { Student } from './student.entity';
  import { Industry } from './industry.entity';
  
  @Entity()
  export class Faculty {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @OneToMany(() => Student, (user) => user.faculty)
    users: Student[];
  
    @ManyToMany(() => Industry, (industry) => industry.faculties)
    @JoinTable()
    industry: Industry;
  }
  