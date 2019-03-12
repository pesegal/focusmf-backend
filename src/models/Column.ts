import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@Entity()
@ObjectType({
  description: 'A Column allows a User to apply states to Tasks.'
})
export class ColumnEntity {
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
  @ManyToOne(type => User, user => user.columns)
  user!: User

  @Field()
  @Column({ length: 50 })
  name!: string
}
