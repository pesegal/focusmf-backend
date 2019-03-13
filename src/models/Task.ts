import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { User } from "./User";
import { TaskAction } from "./TaskAction";

@Entity()
@ObjectType({ description: "Tasks represent a specific goal or item, that you can track your work against." })
export class Task {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @CreateDateColumn()
    created_date!: string

    @UpdateDateColumn()
    updated_date!: string

    @VersionColumn()
    version!: number

    @Field(type => User)
    @ManyToOne(type => User, user => user.tasks)
    user!: User

    @Field(type => TaskAction)
    @OneToMany(type => TaskAction, taskAction => taskAction.task)
    taskActions!: TaskAction[]

    //TODO(Clarkson): Create many to one releationship with Column
    
    @Field()
    @Column("integer")
    columnPos!: number
    
    @Field()
    @Column({ length: 120 })
    name!: string

    @Field()
    @Column()
    notes!: string
}