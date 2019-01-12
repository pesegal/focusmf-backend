import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm"

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
    active!: boolean

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
}