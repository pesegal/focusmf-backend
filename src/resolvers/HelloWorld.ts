import { HelloWorld } from "./types/HelloWorld"
import { Resolver, FieldResolver, Query, Authorized } from "type-graphql";

@Resolver(of => HelloWorld)
export class HelloWorldResolver {
    @Authorized() // Just requires a valid jwt token
    @Query(returns => HelloWorld)
    hello(): HelloWorld {
        return new HelloWorld()
    }

    @Authorized("basic") // Explicit role example 
    @Query(returns => HelloWorld)
    helloBasic(): HelloWorld {
        return new HelloWorld()
    }

    @Authorized("admin") // Example fail role
    @Query(returns => HelloWorld)
    helloAdmin(): HelloWorld {
        return new HelloWorld()
    }
}