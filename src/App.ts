import 'reflect-metadata'
import { createConnection, ConnectionOptions, Connection } from "typeorm"
import express from 'express';
import { User } from './models/entity/User';
import config from 'config';
import { connect } from 'net';

class App {
  public express: express.Express
  private dbConnectionConfig: ConnectionOptions

  constructor () {

    // Load in the connection config information.
    this.dbConnectionConfig = {
      type: 'postgres',
      host: config.get('host'),
      port: config.get('port'),
      username: config.get('username'),
      password: config.get('password'),
      database: config.get('database'),
      synchronize: config.get('synchronize'),
      entities: [   
        __dirname + "/models/entity/*.ts"
      ]
    }

    this.initDatabaseConnection()
    this.express = express()
    this.mountRoutes()
  }

  public initDatabaseConnection (): void {
      //TODO(peter): replace this with logging library.
      console.log(`Scanning for entities: ${__dirname}/models/entity/*.ts`)
      createConnection(this.dbConnectionConfig)
        .then(connection => { 
          console.log(`Log: connected to ${this.dbConnectionConfig.database}`) 
        })
        .catch(error =>
          console.log(error)
        )
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express