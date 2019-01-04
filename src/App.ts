import 'reflect-metadata'
import { createConnection } from "typeorm"
import express from 'express';
import { User } from './models/entity/User';
import { config } from 'node-config-ts';

class App {
  public express: express.Express

  constructor () {
    this.initDatabaseConnection()
    this.express = express()
    this.mountRoutes()
  }

  
  public initDatabaseConnection (): void {
    console.log(`Scanning for entities: ${__dirname}/models/entity/*.ts`)
    
    // Todo(peter) go back to using config. Abd directly create typed variables for the configation object.
    const connectionConfig = {
      ...config.dbConfig,
      ...{
        entities: [   
          __dirname + "/models/entity/*.ts"
        ]
      }
    }
    
    console.log(connectionConfig);
    
    createConnection(connectionConfig).then(async connection => {
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