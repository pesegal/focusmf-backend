import { InputType, Field } from "type-graphql"
import { User } from "../../models/User"
import { Length, IsEmail, IsDate } from "class-validator"
import { Gender, Education, EthnicOrigin, Household, Employment, Usage } from "../../helpers/Enums";

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

    @Field(type => Gender, { nullable: true })
    gender?: Gender

    @Field(type => EthnicOrigin, { nullable: true })
    ethnic_origin?: EthnicOrigin    

    @Field(type => Education, { nullable:  true })
    education?: Education

    @Field(type => Household, { nullable: true })
    household?: Household

    @Field(type => Employment, { nullable: true })
    employment?: Employment

    @Field(type => Usage, { nullable: true })
    usage?: Usage
}
