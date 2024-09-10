import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { Professional } from './professional.entity';

@Entity('industry')
export class Industry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => UserEntity, user => user.department)
  users: Professional[];
}
