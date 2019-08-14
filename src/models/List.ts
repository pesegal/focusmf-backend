import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { Task } from "./Task";

@Entity()
@ObjectType({
  description: 'A List allows a User to apply states to Tasks.'
})
export class List {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn()
  created_date!: string

  @UpdateDateColumn()
  updated_date!: string

  @Column({ type: 'timestamp', nullable: true })
  deleted_timestamp!: Date

  @VersionColumn()
  version!: number

  @Field(type => User)
  @ManyToOne(type => User, user => user.lists)
  user!: User

  @Field()
  @Column({ length: 50 })
  name!: string

  @Field(type => Task)
  @OneToMany(type => Task, task => task.list)
  tasks!: Task[]

  @Field()
  @Column({ default: 0 })
  position!: number
}
