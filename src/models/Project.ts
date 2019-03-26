import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, VersionColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { ObjectType, Field, ID } from "type-graphql";
import { Color } from "./Color";

@Entity()
@ObjectType({ description: "Projects allow grouping of related tasks together for analysis and aggregation." })
export class Project {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Field(type => User)
    @ManyToOne(type => User, user => user.projects, { nullable: false })
    user!: User

    @CreateDateColumn()
    created_date!: Date

    @UpdateDateColumn()
    updated_date!: Date

    @Column({ type: 'timestamp', nullable: true })
    deleted_timestamp!: Date

    @VersionColumn()
    version!: number

    @Field()
    @Column({ length: 240 })
    name!: string

    @Field()
    @ManyToOne(type => Color, { nullable: false })
    color!: Color
}
