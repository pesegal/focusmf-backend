import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, OneToMany } from "typeorm"
import { Permission } from "./Permission"
import jwt from "jsonwebtoken"
import config from "config"
import { ObjectType, Field, ID } from "type-graphql";
import { List } from './List'
import { Project } from "./Project";

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
    dateofbirth!: string

    @Field(type => [Permission])
    @OneToMany(type => Permission, permission => permission.user, { eager: true })
    permissions!: Permission[]

    @Field(type => [Project])
    @OneToMany(type => Project, project => project.user, { eager: true })
    projects!: Project[]

    public generateAuthToken(): string {
        const permissionStrings = this.permissions.map(p => p.permission)
        const token = jwt.sign({id: this.id, per: permissionStrings}, config.get("jwtPrivateKey"))
        return token
    }

    @Field(type => [List])
    @OneToMany(type => List, list => list.user, { eager: true, nullable: false })
    lists!: List[]
}