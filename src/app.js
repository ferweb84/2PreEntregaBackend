import express from "express";
import handlebars from 'express-handlebars'
import __dirname, { uploader}  from "./dirname.js";

import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import database from "./db.js";
import config from "./config.js";
import {winstonLogger} from "./utils/logger.js"
import routesFunction from "./routes/app.router.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";

import bodyParser from "body-parser";


//Initialization
const productServer = express();
//Middlewares
productServer.use(bodyParser.json());
productServer.use(bodyParser.urlencoded({extended: true}));

productServer.use(winstonLogger)
productServer.use(express.json());
productServer.use(express.static(`${__dirname}/public`));
productServer.use(express.urlencoded({ extended: true }));

//productServer.use(passport.session())

productServer.use(cookieParser())
initializePassport()



database.connect();

routesFunction(productServer)
productServer.use(passport.initialize())


//View engine
productServer.engine("handlebars", handlebars.engine());
productServer.set("views", `${__dirname}/views`);
productServer.set("view engine", "handlebars");

const httpServer = productServer.listen(8080, (req, res) => {
  try {
    console.log("Listening on port 8080")
  } catch (error) {
   console.log(error)
    return res.status(500).send({
      status: "error",
      error: "Failed to the connect to the server",
  });
  }
});


//socket.connect(httpServer)



