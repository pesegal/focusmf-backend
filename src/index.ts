import "reflect-metadata" // Required to be imported first for typeDI to work.

import config from "config"
import { Container } from "typedi"
import * as TypeOrm from "typeorm"
import * as TypeGraphQL from "type-graphql"
import { ApolloServer } from "apollo-server"
import { HelloWorldResolver } from "./resolvers/HelloWorld"
import { UserResolver } from "./resolvers/UserResolver"
import { tokenAuthorization, getDataFromToken } from "./middleware/Authorization"
import { logger } from "./middleware/Logger"
import { GraphQLError } from "graphql";
import { ListResolver } from "./resolvers/ListResolver";
import { DefaultData } from "./helpers/DefaultData";
import { ProjectResolver } from "./resolvers/ProjectResolver";


// Register the dependency injection container with typeORM & typeGraphQL
TypeOrm.useContainer(Container)
TypeGraphQL.useContainer(Container)

/**
 * This function initializes the database, server, and logger.
 */
async function startup() {
  logger.info("Initializing Focus.mf Backend")

  const tokenHeaderName: string = config.get('authorizationHeader')
  // Confirm the JWT private key is set correctly in production.
  if (config.util.getEnv('NODE_ENV') === 'prod' && config.get('jwtPrivateKey') === 'devJwtKey') {
    throw new Error("jwtPrivateKey not set. Set it with environment var 'focusmf_jwtPrivateKey'.")
  }

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
      logging: config.get("dbSettings.logLevel")
    }

    await TypeOrm.createConnection(dbConnectionConfig)
    // Check and initialize default data.
    const defaultData: DefaultData = Container.get(DefaultData)
    await defaultData.initDefaultColorData()

    const schema = await TypeGraphQL.buildSchema({
      resolvers: [HelloWorldResolver, UserResolver, ListResolver, ProjectResolver],
      authChecker: tokenAuthorization
    })

    const server = new ApolloServer({
      schema,
      context: async ({ req }) => { // Add auth token to context for authorization check
        let authToken = getDataFromToken(req.headers[tokenHeaderName] as string)
        return { authToken }
      },
      formatResponse: (response: any) => { // Logging responses
        logger.debug(JSON.stringify(response))
        return response
      },
      formatError: (error: GraphQLError) => { // Logging errors
        logger.error(error)
        return error
      },
      playground: true,
      introspection: true
    })

    const { url } = await server.listen(config.get("port"))
    logger.info(`Server is running, GraphQL Playground available at ${url}`)

  } catch (error) {
    logger.error(error)
  }
}

startup();
