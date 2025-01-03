import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  import { Student } from './student.entity';  // Assuming you have a Student entity
  import { Professional } from './professional.entity';  // Assuming you have a Professional entity
import { Industry } from './industry.entity';
import { SpacePost } from './spacePost.entity';
import {Event} from './event.entity';
  
  @Entity()
  export class Spaces {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    description :string

    @ManyToOne(() => Industry, (industry) => industry.spaces)
    industry: Industry
  
    @ManyToMany(() => Student, (student) => student.spaces)
    @JoinTable({ name: 'space_students' })
    studentMembers: Student[];
  
  
    @ManyToOne(
      () => Professional,
      (professional) => professional.coordinatedSpaces,
      { nullable: true },
    )
    @JoinColumn()
    professionalCoordinator: Professional;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column()
    skillLevel: 'beginner' | 'intermediate' | 'advanced'

    @Column()
    maxNumberOfStudents: number

    @OneToMany(() => SpacePost, (post) => post.space)
    posts: SpacePost[]

    @OneToMany(() => Event, (event) => event.space) 
    events: Event[]


  }
  