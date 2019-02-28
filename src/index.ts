import "reflect-metadata"

import config from "config"
import { Container } from "typedi"
import * as TypeOrm from "typeorm"
import * as TypeGraphQL from "type-graphql"
import { ApolloServer } from "apollo-server"
import { HelloWorldResolver } from "./resolvers/helloworld"

// Register the dependency injection container with typeORM.
TypeOrm.useContainer(Container)

async function startup() {
  console.log("Startup")

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
      resolvers: [HelloWorldResolver]
    })

    const server = new ApolloServer({
      schema,
      playground: true
    })

    const { url } = await server.listen(config.get("port"))
    console.log(`Server is running, GraphQL Playground available at ${url}`)

  } catch (error) {
    console.log(error)
  }
}

startup();