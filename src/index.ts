import "reflect-metadata" // Required to be imported first for typeDI to work.

import config from "./config"
import { Container } from "typedi"
import * as TypeOrm from "typeorm"
import * as TypeGraphQL from "type-graphql"
import { ApolloServer } from "apollo-server"
import { HelloWorldResolver } from "./resolvers/HelloWorld"
import { UserResolver } from "./resolvers/UserResolver"
import { tokenAuthorization, getDataFromToken } from "./middleware/Authorization"
import { logger } from "./middleware/Logger"
import { GraphQLError } from "graphql"
import { ListResolver } from "./resolvers/ListResolver"
import { User } from "./models/User"
import { DefaultData } from "./helpers/DefaultData"
import { ProjectResolver } from "./resolvers/ProjectResolver"
import { TaskResolver } from "./resolvers/TaskResolver"
import { TaskActionResolver } from "./resolvers/TaskActionResolver"
import "./helpers/Enums"

// Register the dependency injection container with typeORM & typeGraphQL
TypeOrm.useContainer(Container)

/**
 * This function initializes the database, server, and logger.
 */
async function startup() {
  logger.info("Initializing Focus.mf Backend")

  const tokenHeaderName: string = config.AUTH_HEADER
  // Confirm the JWT private key is set correctly in production.
  if (process.env.NODE_ENV === 'production' && config.JWT_PRIVATE_KEY === 'devJwtKey') {
    throw new Error("jwtPrivateKey not set. Set it with environment var 'focusmf_jwtPrivateKey'.")
  }

  try {
    // Pulls the config `ormconfig.json` from root
    await TypeOrm.createConnection()
    // Check and initialize default data.
    const defaultData: DefaultData = Container.get(DefaultData)
    await defaultData.initDefaultColorData()

    const schema = await TypeGraphQL.buildSchema({
      resolvers: [
        HelloWorldResolver,
        UserResolver,
        ListResolver,
        ProjectResolver,
        TaskResolver,
        TaskActionResolver
      ],
      authChecker: tokenAuthorization,
      emitSchemaFile: true,
      container: Container
    })

    const server = new ApolloServer({
      schema,
      context: async ({ req }) => { // Add auth token to context for authorization check
        let authToken, user
        try {
          authToken = getDataFromToken(req.headers[tokenHeaderName] as string)
          user = await TypeOrm.getRepository(User).findOneOrFail({ id: authToken!.id })
          return { authToken, user }
        } catch (e) {
          logger.debug(`Unable to create an authenticated Context with auth token as: ${authToken}`)
          return {}
        }
      },
      formatResponse: (response: any) => { // Logging responses
        logger.debug(JSON.stringify(response))
        return response
      },
      formatError: (error: GraphQLError) => { // Logging errors
        logger.error(error)
        return error
      },
      playground: process.env.NODE_ENV !== 'production',
      introspection: true
    })

    const { url } = await server.listen(config.PORT)
    logger.info(`Server is running, GraphQL Playground available at ${url}`)

  } catch (error) {
    logger.error(error)
  }
}

startup()
