import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { ObjectType, Field, ID } from "type-graphql";

/**
 * The permissions entity stores authorization permissions for a user, with
 * the idea of allowing different tiers of usage.
 */
@Entity()
@ObjectType()
export class Permission {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Field(type => User)
    @ManyToOne(type => User, user => user.permissions)
    user!: User

    @Field()
    @Column({
        default: 'basic'
    })
    permission!: string
}