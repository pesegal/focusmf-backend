import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, OneToMany } from "typeorm"
import { Permission } from "./Permission";

/**
 * The User entity stores user accounts, and is used for authentication and authorization procedures.
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string; // ! ts non-null assertion operator, explicitly tell TS that these will be defined elseware.

    @CreateDateColumn()
    created_date!: string

    @UpdateDateColumn()
    updated_date!: string

    @VersionColumn()
    version!: number

    @Column({
        length: 320,
        unique: true
    })
    email!: string

    @Column()
    password!: string

    @Column({
        default: false
    })
    verified!: boolean

    @Column({
        nullable: true,
        length: 120
    })
    first_name!: string

    @Column({
        nullable: true,
        length: 120        
    })
    last_name!: string

    @Column({
        type: "date",
        nullable: true
    })
    dateofbirth!: string

    @OneToMany(type => Permission, permission => permission.user)
    permissions!: Permission[]
}