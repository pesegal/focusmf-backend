import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string; // ! ts non-null assertion operator, explicitly tell TS that these will be defined elseware.

    @Column()
    email!: string;

    @Column()
    active!: boolean;

    @Column()
    access!: string;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column("date")
    dateofbirth!: string;
}