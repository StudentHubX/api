import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Spaces } from './spaces.entity';
import { SpacePostComment } from './spacePostComment.entity';

@Entity()
export class SpacePost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: ['text', 'image', 'video'], default: 'text' })
  type: 'text' | 'image' | 'video';

  @Column({ nullable: true })
  mediaUrl?: string;

  @ManyToOne(() => Spaces, (space) => space.posts, { onDelete: 'CASCADE' })
  space: Spaces;

  @Column({ nullable: true })
  authorId?: number;

  @OneToMany(() => SpacePostComment, (comment) => comment.post, { cascade: true })
  comments: SpacePostComment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
