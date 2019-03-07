import "reflect-metadata"

import config from "config"
import { Container } from "typedi"
import * as TypeOrm from "typeorm"
import * as TypeGraphQL from "type-graphql"
import { ApolloServer } from "apollo-server"
import { HelloWorldResolver } from "./resolvers/HelloWorld"
import { UserResolver } from "./resolvers/UserResolver";
import { tokenAuthorization, getDataFromToken } from "./middleware/Authorization";

// Register the dependency injection container with typeORM & typeGraphQL
TypeOrm.useContainer(Container)
TypeGraphQL.useContainer(Container)

/**
 * This function initializes the database, server, and logger.
 */
async function startup() {
  console.log("Startup") // TODO: ADD WINSTON LOGGER

  const tokenHeaderName: string = config.get('authorizationHeader')

  try {
    // Load in the connection config information.
    let dbConnectionConfig: TypeOrm.ConnectionOptions = {
      type: 'postgres',
      host: config.get('dbSettings.host'),
      port: config.get('dbSettings.port'),
      username: config.get('dbSettings.username'),
      password: config.get('dbSettings.password'),
      database: config.get('dbSettings.database'),
      synchronize: config.get('dbSettings.synchronize'),
      entities: [   
        __dirname + "/models/*"
      ],
      logging: 'all'
    }

    await TypeOrm.createConnection(dbConnectionConfig)

    const schema = await TypeGraphQL.buildSchema({
      resolvers: [HelloWorldResolver, UserResolver],
      authChecker: tokenAuthorization
    })

    const server = new ApolloServer({
      schema,
      context: async ({ req }) => { // Add auth token to context for authorization check
        let authToken = getDataFromToken(req.headers[tokenHeaderName] as string)
        return { authToken }
      },
      playground: true
    })

    const { url } = await server.listen(config.get("port"))
    console.log(`Server is running, GraphQL Playground available at ${url}`)

  } catch (error) {
    console.log(error)
  }
}

startup();