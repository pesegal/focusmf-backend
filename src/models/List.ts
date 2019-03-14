import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

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

  @VersionColumn()
  version!: number

  @Field(type => User)
  @ManyToOne(type => User, user => user.lists)
  user!: User

  @Field()
  @Column({ length: 50 })
  name!: string
}
