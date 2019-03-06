import { Field, ObjectType } from "type-graphql";
import { Length, IsEmail } from "class-validator";

/**
 * Defines the graphql schema type for user auth input.
 */
@ObjectType({ description: "Authorization Token Response" })
export class AuthToken {

    constructor(token: string) {
        this.token = token
    }    
    
    @Field({ description: "Authorization JWT"})
    token!: string
}