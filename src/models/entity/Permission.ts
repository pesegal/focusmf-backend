import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

/**
 * The permissions entity stores authorization permissions for a user, with
 * the idea of allowing different tiers of usage.
 */
@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @ManyToOne(type => User, user => user.permissions)
    user!: User

    @Column({
        default: 'basic'
    })
    permission!: string
}