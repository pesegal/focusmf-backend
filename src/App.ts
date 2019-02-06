import { createConnection, ConnectionOptions, Connection } from "typeorm"
import express from 'express';
import config from 'config';
import winston, { Logger } from 'winston';
import expressWinston from 'express-winston'

// Api Documentation Imports
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

// Route Imports
import health from './routes/HealthCheck'
import userRoutes from './routes/User'
import authRoutes from './routes/Auth'


class App {
  public express: express.Express
  public logger: winston.Logger
  private dbConnectionConfig: ConnectionOptions

  constructor () {
    // Init Logger
    this.logger = this.createLogger()
    this.validateJwtKeySet()
    this.logger.info(`NODE_ENV: ${config.util.getEnv('NODE_ENV')}`)

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
        __dirname + "/models/entity/*"
      ]
    }

    this.express = express()
    this.initalize()
  }
  
  /**
   * This method is to allow for async init order to complete correctly make sure that the database 
   * finishes starting up before the rest of the app initializes.
   */
  private async initalize(): Promise<void>  {
    await this.initDatabaseConnection()
  
    // Init express server
    this.initMiddleWare()
    if(config.get('logRequests') === true) {
      this.logger.info('Logging HTTP Requests: true')
      this.initRequestLogging()
    }
    this.mountRoutes()
    this.initSwaggerDocumentation()
  }

  /**
   * Initialize the application logger. Will be avaiable through the App.logger property
   */
  private createLogger (): winston.Logger {
    return winston.createLogger({
      level: config.get("logLevel"),
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

  /**
   * This function initializes swagger API documentation. To edit / update the swagger
   * documentation modify the swagger.yaml file in the documentation folder. There is 
   * a good live editor tool called 'Swagger Editor' that can assist with writing API 
   * documentation which you find here: editor.swagger.io
   */
  private initSwaggerDocumentation (): void {
    // This removes the branded swagger topbar from the API docs.
    const options = {
      customCss: '.swagger-ui .topbar { display: none }'
    }    
    const swaggerDoc = YAML.load(__dirname + '/../doc/swagger.yaml')
    this.express.use('/apidoc', swaggerUi.serve, swaggerUi.setup(swaggerDoc, options))
  }

  /**
   * This function initialized the database connection with typeORM. The create connection
   * is registered in the global namespace once complete and is used by typeORM
   * specific methods to get entity managers and repository objects.  
   */
  private async initDatabaseConnection (): Promise<Connection> {
      this.logger.info(`Scanning for entities: ${__dirname}/models/entity/*`)
      try {
        const connection = await createConnection(this.dbConnectionConfig)
        this.logger.info(`Connected to database: ${this.dbConnectionConfig.database}.`)
        return connection
      } catch(error) {
        this.logger.error(error)
        return error
      }
  }

  /**
   * This confirms that a jwtPrivateKey environment variable is set otherwise fail to start the backend service.
   */
  private validateJwtKeySet (): void {
    if (config.util.getEnv('NODE_ENV') === 'prod' && config.get('jwtPrivateKey') === 'devJwtKey') {
      throw new Error("jwtPrivateKey not set. Set it with environment var 'focusmf_jwtPrivateKey'.")
    }
  }

  /**
   * Registers all of the middleware functions needed by the application.
   */
  private initMiddleWare (): void {
    this.express.use(express.json())
  }

  /**
   * Registers all of the routers with the express server.
   */
  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: config.get('jwtPrivateKey')
      })
    })
    this.express.use('/', router)
    this.express.use('/health', health)
    this.express.use('/user', userRoutes())
    this.express.use('/login', authRoutes())
  }
}

const app = new App();

export default app
