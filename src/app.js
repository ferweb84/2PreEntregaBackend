import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./dirname.js";

import cookieParser from "cookie-parser";

import database from "./db.js";
import cors from "cors";
import { winstonLogger } from "./utils/logger.js";
import routesFunction from "./routes/app.router.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";
import paymentsRouter from "./routes/payment.router.js"
import bodyParser from "body-parser";
import { compare } from './views/helper.js'

//Initialization
const app = express();
//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(winstonLogger)
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

//app.use(passport.session())

app.use(cookieParser())
initializePassport()

// app.use(cors());
app.use("/api/payments",paymentsRouter);

database.connect();

routesFunction(app)
app.use(passport.initialize())


//View engine
app.engine(
  'handlebars',
  handlebars.engine({
    helpers: {
      compare
    },
    defaultLayout: 'main'
  })
)
//app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

const httpServer = app.listen(8080, (req, res) => {
  try {
    console.log("Listening on port 8080")
  } catch (error) {

    return res.status(500).send({
      status: "error",
      error: "Failed to the connect to the server",
  });
  }
});


//socket.connect(httpServer)



