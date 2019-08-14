import winston from "winston"
import config from "../config"

export const logger: winston.Logger = winston.createLogger({
    level: config.LOG_LEVEL,
    format: winston.format.cli(),
    transports: [
        new winston.transports.Console()
    ]
})
