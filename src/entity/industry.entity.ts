import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { Professional } from './professional.entity';
import { Spaces } from './spaces.entity';
import { Department } from './department.entity';

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

  @OneToMany(() => Department, (department) => department.industry)
    departments: Department[];
}
