import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import database from "./db.js";
import socket from "./socket.js";
import config from "./config.js";
import passport from "passport";
import initializePassport from "./auth/passport.js";
import productsRouter from "./routes/product.router.js";
import cartsRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import __dirname from "./utils.js";
import { routerApi } from "./routes/index.js";
import nodemailer from "nodemailer";
import twilio from "twilio";
import usersRouter from "./routes/users.router.js";
import {addLogger} from "./utils/logger.js";



// Initialization
const app = express();

  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth:{
      user:"ferweb.reyna@gmail.com",
      pass:"onilbjsqlkkaeuot",
    },
  });
  app.get ("/mail", async (req,res)=>{
    let result = await transport.sendMail({
      from: "ferweb.reyna@gmail.com",
      to:"arqfernandoreyna@gmail.com",
      subject: "Test mail",
      html:`<div>
      <h1>This is tasting mail </h1>
      <img src = "cid:perrito1"/>
      </div>`,
      attachments:[{
        filename: 'perrito1.jpg',
        path:`${__dirname}/public/images/perrito1.jpg`,
        cid:'perrito1'
      }],
    })
    res.send({status: "success", message: "mail sent"});
});
//////////

const client= twilio("AC68b5a1ef268b16c8b45f2ef85273ab69","9c359c44193e8f4264d6782657e553f4");

app.get("/sms", async (req,res)=>{

  await client.messages.create({
    body:"Esto es un mesaje desde Twilio",
    from:"+13613154737",
    to:"+543512390128",
  });
  res.send({status:"success", message:"sms sent"});
});




// Settings
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

// Midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(`${__dirname}/public`));
app.use(morgan("dev"));
app.use(cors({origin: "http://127.0.0.1:5500", methods: ["GET","POST","PUT"]}));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());
app.use(addLogger);

// Database connection
database.connect();

// Routes
routerApi(app);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);
app.use ("/api/users",usersRouter);

const port = config.port || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//winston
app.get("/winston", (req,res) => {
  logger.http("Peticion en endopint de prueba");
  res.send ({message: "Esta es na prueba"});
});

// socket.connect(httpServer);
