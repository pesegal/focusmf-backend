import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, VersionColumn, OneToOne, JoinColumn, FileLogger } from "typeorm";
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
    @ManyToOne(type => User, user => user.projects)
    user!: User

    @CreateDateColumn()
    created_date!: string

    @UpdateDateColumn()
    updated_date!: string

    @VersionColumn()
    version!: number
    
    @Field()
    @Column({ length: 240 })
    name!: string

    @Field()
    @OneToOne(type => Color)
    @JoinColumn()
    color!: Color
}