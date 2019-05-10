import { InputType, Field } from "type-graphql"
import { User } from "../../models/User"
import { Length, IsEmail, Max, IsDate } from "class-validator"

@InputType({ description: "Create User Input" })
export class UserInput implements Partial<User> {
    @Field({ description: "Needs to be an email between 6 and 320 chars."})
    @Length(6, 320)
    @IsEmail()
    email!: string
    
    @Field({ description: "Password between 8 and 50 chars in length."})
    @Length(8, 50)
    password!: string

    @Field({ nullable: true, description: "Max Length 50 chars." })
    @Length(0, 50)
    first_name?: string

    @Field({ nullable: true, description: "Max Length 50 chars." })
    @Length(0, 50)
    last_name?: string

    @Field({ nullable: true, description: "Needs to be a valid date string." })
    @IsDate()
    dateofbirth?: Date
}
