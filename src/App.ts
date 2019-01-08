import 'reflect-metadata'
import { createConnection, ConnectionOptions, Connection } from "typeorm"
import express from 'express';
import { User } from './models/entity/User';
import config from 'config';

class App {
  public express: express.Express
  //public connection: Connection
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
    console.log(`Scanning for entities: ${__dirname}/models/entity/*.ts`)

    // TODO(PETER): Return an active connection object and set 
    createConnection(this.dbConnectionConfig).then(async connection => {
        let user = new User();
        user.email = 'test@test.com'
        user.active = true
        user.access = 'All'
        user.first_name = 'Tester'
        user.last_name = "McTesterson"
        user.dateofbirth = "01-01-1990"

        await connection.manager.save(user);
        console.log(' Test User has been saved.')

      // TODO: Move this to another area
    }).catch(error => {
      console.log(error)
    })
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