import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, Column, ManyToOne, OneToMany, ManyToMany } from "typeorm"
import { Field, ObjectType, ID } from "type-graphql"
import { User } from "./User"
import { TaskAction } from "./TaskAction"
import { List } from "./List"
import { Project } from "./Project"

@Entity()
@ObjectType({ description: "Tasks represent a specific goal or item, that you can track your work against." })
export class Task {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @CreateDateColumn()
    created_date!: Date

    @UpdateDateColumn()
    updated_date!: Date

    @Column({ type: 'timestamp', nullable: true })
    deleted_timestamp!: Date

    @VersionColumn()
    version!: number

    @Field(type => User)
    @ManyToOne(type => User, user => user.tasks)
    user!: User

    @Field(type => [TaskAction])
    @OneToMany(type => TaskAction, taskAction => taskAction.task)
    taskActions!: TaskAction[]

    @Field(type => [Project])
    @ManyToMany(type => Project, project => project.tasks)
    projects!: Project[]

    @Field(type => List)
    @ManyToOne(type => List, list => list.tasks)
    list!: List

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
