import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

/**
 * The permissions entity stores authorization permissions for a user, with
 * the idea of allowing different tiers of usage.
 */
@Entity()
@ObjectType({ description: "Color contains the color information for projects."})
export class Color {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Field()
    @Column()
    hex!: string

    @Field()
    @Column()
    name!: string
}