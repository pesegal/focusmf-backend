import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class HelloWorld {

    constructor() {
        this.message = "Hello World!"
    }

    @Field()
    message!: string

}