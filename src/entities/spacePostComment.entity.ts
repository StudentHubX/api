import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { SpacePost } from './spacePost.entity';
  
  @Entity()
  export class SpacePostComment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text' })
    content: string;
  
    @Column({ nullable: true })
    authorId?: number;
  
    @ManyToOne(() => SpacePost, (post) => post.comments, { onDelete: 'CASCADE' })
    post: SpacePost;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  