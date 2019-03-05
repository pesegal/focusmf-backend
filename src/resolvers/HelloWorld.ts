import { HelloWorld } from "./types/HelloWorld"
import { Resolver, FieldResolver, Query } from "type-graphql";

@Resolver(of => HelloWorld)
export class HelloWorldResolver {

    @Query(returns => HelloWorld)
    hello(): HelloWorld {
        return new HelloWorld()
    }

}