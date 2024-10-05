import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    ManyToOne,
  } from 'typeorm';
  import { Student } from './student.entity';  // Assuming you have a Student entity
  import { Professional } from './professional.entity';  // Assuming you have a Professional entity
import { Industry } from './industry.entity';
  
  @Entity()
  export class Spaces {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @ManyToOne(() => Industry, (industry) => industry.spaces)
    industry: Industry
  
    @ManyToMany(() => Student, (student) => student.spaces)
    @JoinTable({ name: 'room_students' })
    studentMembers: Student[];
  
    @ManyToMany(() => Professional, (professional) => professional.spaces)
    @JoinTable({ name: 'room_professionals' })
    professionalMembers: Professional[];
  
    @ManyToOne(() => Student, (student) => student.coordinatedSpaces, {
      nullable: true,
    })
    studentCoordinator: Student;
  
    @ManyToOne(
      () => Professional,
      (professional) => professional.coordinatedSpaces,
      { nullable: true }
    )
    professionalCoordinator: Professional;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  }
  