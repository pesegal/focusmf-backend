import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, OneToMany } from "typeorm"
import { Permission } from "./Permission"
import jwt from "jsonwebtoken"
import config from "config"
import { ObjectType, Field, ID } from "type-graphql"
import { List } from './List'
import { Project } from "./Project"
import { Task } from "./Task"
import { Gender, EthnicOrigin, Education, Household, Employment, Usage } from "../helpers/Enums";

/**
 * The User entity stores user accounts, and is used for authentication and authorization procedures.
 */
@Entity()
@ObjectType({ description: "A Focus.mf User." })
export class User {
    @Field(type => ID)
    @PrimaryGeneratedColumn('uuid')
    id!: string; // ! ts non-null assertion operator, explicitly tell TS that these will be defined elseware.

    @CreateDateColumn()
    created_date!: string

    @UpdateDateColumn()
    updated_date!: string

    @VersionColumn()
    version!: number

    @Field({ description: "The users email. Standard email requirements." })
    @Column({
        length: 320,
        unique: true
    })
    email!: string

    @Column()
    password!: string

    @Field()
    @Column({
        default: false
    })
    verified!: boolean

    @Field({ nullable: true})
    @Column({
        nullable: true,
        length: 120
    })
    first_name!: string

    @Field({ nullable: true })
    @Column({
        nullable: true,
        length: 120
    })
    last_name!: string

    @Field({ nullable: true })
    @Column({
        type: "date",
        nullable: true
    })
    dateofbirth!: Date

    @Field(type => Gender, { nullable: true })
    @Column({ nullable: true })
    gender!: Gender

    @Field(type => EthnicOrigin, { nullable: true })
    @Column({ nullable: true })
    ethnic_origin!: EthnicOrigin

    @Field(type => Education, { nullable: true })
    @Column({ nullable: true })
    education!: Education

    @Field(type => Household, { nullable: true })
    @Column({ nullable: true })
    household!: Household

    @Field(type => Employment, { nullable: true })
    @Column({ nullable: true })
    employment!: Employment

    @Field(type => Usage, { nullable: true })
    @Column({ nullable: true })
    usage!: Usage

    @Field(type => [Permission])
    @OneToMany(type => Permission, permission => permission.user, { eager: true })
    permissions!: Permission[]

    @Field(type => [Project], { nullable: true })
    @OneToMany(type => Project, project => project.user)
    projects!: Project[]

    @Field(type => [Task], { nullable: true })
    @OneToMany(type => Task, task => task.user)
    tasks!: Task[]

    public generateAuthToken(): string {
        const permissionStrings = this.permissions.map(p => p.permission)
        const token = jwt.sign({id: this.id, per: permissionStrings}, config.get("jwtPrivateKey"))
        return token
    }

    @Field(type => [List])
    @OneToMany(type => List, list => list.user, { eager: true, nullable: false })
    lists!: List[]
}
