import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Industry } from "./industry.entity";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @ManyToMany(() => Industry, (industry) => industry.topics)
    industries: Industry[]
}