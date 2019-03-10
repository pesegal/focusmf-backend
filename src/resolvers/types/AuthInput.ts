import { InputType, Field } from "type-graphql";
import { User } from "../../models/User";
import { Length, IsEmail } from "class-validator";

/**
 * Defines the graphql schema type for user auth input.
 */
@InputType({ description: "Input to use for login." })
export class AuthInput implements Partial<User> {
    @Field({ description: "User's Email"})
    @Length(6,320)
    @IsEmail()
    email!: string

    @Field({ description: "User's Password"})
    @Length(8, 50)
    password!: string    
}