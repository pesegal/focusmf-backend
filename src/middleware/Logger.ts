import winston from "winston"
import config from "config"

export const logger: winston.Logger = winston.createLogger({
    level: config.get("logLevel"),
    format: winston.format.cli(),
    transports: [
        new winston.transports.Console()
    ]
})
