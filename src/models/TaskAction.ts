import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Task } from "./Task";

@Entity()
@ObjectType({ description: "TaskAction represents a time action recorded against a task." })
export class TaskAction {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Field()
    @Column({ type: "timestamptz" })
    start!: Date

    @Field()
    @Column({ type: "timestamptz" })
    end!: Date

    @Field(type => Task)
    @ManyToOne(type => Task, task => task.taskActions)
    task!: Task[]

    @Field()
    @Column()
    actionType!: string // Make this into an enum??
}
