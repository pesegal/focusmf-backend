import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Task } from "./Task";

@Entity()
@ObjectType({ description: "TaskAction represents a time action recorded against a task." })
export class TaskAction {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ type: "timestamp" })
    start!: Date

    @Column({ type: "timestamp" })
    end!: Date

    @Field(type => Task)
    @ManyToOne(type => Task, task => task.taskActions)
    task!: Task[]

    //TODO(Clarkson): Create many to one releationship with Column
    
    @Field()
    @Column()
    actionType!: string // Make this into an enum??
}