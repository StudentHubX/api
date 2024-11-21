import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Spaces } from "./spaces.entity";

@Entity()
export class spacePost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: ['text', 'image', 'video'], default: 'text' })
  type: 'text' | 'image' | 'video';

  @Column({ nullable: true })
  mediaUrl?: string;

  @ManyToOne(() => Spaces, (space) => space.posts)
  space: Spaces;
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
