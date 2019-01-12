import { createConnection, ConnectionOptions } from "typeorm"
import express from 'express';
import config from 'config';
import winston from 'winston';
import expressWinston from 'express-winston'

// Route Imports
import health from './routes/HealthCheck'


class App {
  public express: express.Express
  public logger: winston.Logger
  private dbConnectionConfig: ConnectionOptions

  constructor () {
    // Init Logger
    this.logger = this.createLogger()

    // Load in the connection config information.
    this.dbConnectionConfig = {
      type: 'postgres',
      host: config.get('dbSettings.host'),
      port: config.get('dbSettings.port'),
      username: config.get('dbSettings.username'),
      password: config.get('dbSettings.password'),
      database: config.get('dbSettings.database'),
      synchronize: config.get('dbSettings.synchronize'),
      entities: [   
        __dirname + "/models/entity/*.ts"
      ]
    }

    // TODO: Figure out how to await this finishing. Ask Clarkson!!
    // DOUBLE TODO: This is causing an error because connection hasn't been established.
    this.initDatabaseConnection()

    // Init express server
    this.express = express()
    this.initMiddleWare()
    if(config.get('logRequests') === true) {
      this.logger.info('Logging HTTP Requests: true')
      this.initRequestLogging()
    }
    this.mountRoutes()
  }

  private createLogger (): winston.Logger {
    return winston.createLogger({
      level: 'info',
      format: winston.format.cli(),
      transports: [
        new winston.transports.Console()
      ]
    })
  }

  /**
   * This function registers the winston logger defined in the :createLogger function
   * and registers it as middleware on the express server. You can turn this on and off
   * with the 'logRequests' configuration setting.
   */
  private initRequestLogging (): void {
    this.express.use(expressWinston.logger(this.logger))
  }

  private initDatabaseConnection (): void {
      this.logger.info(`Scanning for entities: ${__dirname}/models/entity/*.ts`)
      createConnection(this.dbConnectionConfig)
        .then(connection => { 
          this.logger.info(`Connected to database: ${this.dbConnectionConfig.database}.`) 
        })
        .catch(error =>
          this.logger.error(error)
        )
  }

  private initMiddleWare (): void {
    this.express.use(express.json())
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    this.express.use('/', router)
    this.express.use('/health', health)
  }
}

export default new App()
