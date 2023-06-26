import express from "express";
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import database from './db.js';
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import viewsRouter from './routes/views.router.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import sessionRouter from './routes/sessions.router.js';
import config from "./config.js";
import initializePassport from "./auth/passport.js";
import passport from "passport";
import { errorMiddleware } from "../middlewares/error.js";
import {ErrorsName,ErrorsMessage,ErrorsCause,} from "../errors/error.enum.js"
import { loggerMiddleware } from "../middlewares/logger.js";
import { logger } from "./logger.js";
import CustomError from "../errors/CustomError.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(`${__dirname}/public`));
// app.use(morgan("dev"));
app.use(loggerMiddleware);

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.dbUrl,
        ttl: 120,
    }),
    resave: true,
    saveUninitialized: false,
    secret: config.sessionSecret
}));

app.use(passport.initialize());
app.use(passport.session());
initializePassport();

app.listen(config.port, () => {
    logger.debug(`Server runing at port ${config.port}`);
});

database.connect();


app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionRouter);

app.get("/mockingproducts",(req,res)=>{
    res.send("mocking");
});

app.get("/users",(req,res)=>{
    CustomError.generateCustomError({
        name:ErrorsName.GENERAL_ERROR_NAME,
        message:ErrorsMessage.AUTHENTICATION_ERROR_MESSAGE,
        cause:ErrorsCause.AUTHENTICATION_ERROR_CAUSE,
    });
});
app.get("/productsError",(req,res)=>{
    CustomError.generateCustomError({
        name:ErrorsName.GENERAL_ERROR_NAME,
        message:ErrorsMessage.PRODUCT_NOT_FOUND_MESSAGE,
        cause:ErrorsCause.PRODUCT_NOT_FOUND_CAUSE,
    });
})
app.use(errorMiddleware);

app.get("/loggerTest", (req, res) => {
    logger.debug("This is a debug log");
    logger.http("This is an HTTP log");
    logger.info("This is an info log");
    logger.warning("This is a warning log");
    logger.error("This is an error log");
    logger.fatal("This is a fatal log");

    res.send("Logger test completed");
});

app.get('/operacionsencilla', (req,res)=>{
    let sum = 0;
    for (let i =0 ; i< 1000000; i++) {
        sum += i
    }
    res.send({sum});
});

app.get('/operacioncompleja', (req,res)=>{
    let sum = 0;
    for (let i =0 ; i< 5e8; i++) {
        sum += i
    }
    res.send({sum});
});

  