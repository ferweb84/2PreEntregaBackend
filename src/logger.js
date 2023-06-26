import winston from "winston";
import __dirname from "./utils.js";
import config from "./config.js";

const customLevel = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        debug: "grey",
        http: "green",
        info: "blue",
        warning: "yellow",
        error: "red",
        fatal: "magenta"
    }
}

const developmentLogger = winston.createLogger({
    levels: customLevel.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevel.colors }),
                winston.format.simple()
            )
        }),
    ]
});

const productionLogger = winston.createLogger({
    levels: customLevel.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: "info",
            format: winston.format.simple(),
        }),
    ],
});

const logger = config.developmentMode === false ? productionLogger : developmentLogger;

export { logger };