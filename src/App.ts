import 'reflect-metadata'
import { createConnection, Connection } from "typeorm"
import express from 'express';
import { print } from 'util';

class App {
  public express: express.Express

  constructor () {
    this.initDatabaseConnection()
    this.express = express()
    this.mountRoutes()
  }

  public initDatabaseConnection (): void {
    console.log(`Scanning for entities: ${__dirname}/models/entity/*.ts`)
    createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        // TODO(Peter): Load these params from config file.
        username: "focus",
        password: "focus",
        database: "focusmf",
        entities: [
          __dirname + "/models/entity/*.ts"
        ],
        synchronize: true
    }).then(connection => {
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