import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Spaces } from './spaces.entity';
import { Professional } from './professional.entity';


@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  calenderUrl: string;

  @Column()
  date: Date;

  @ManyToOne(() => Spaces, (space) => space.events, { onDelete: 'CASCADE' })
  space: Spaces;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
