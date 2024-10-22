import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Industry } from "./industry.entity";
import { Resource } from "./resource.entity";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @ManyToMany(() => Industry, (industry) => industry.topics)
    @JoinTable()
    industries: Industry[]

    @OneToMany(() => Resource, (resource) => resource.topic)
    resources: Resource[]
}