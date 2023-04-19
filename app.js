import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
import socket from './socket.js'
import mongoose from "mongoose";
import dotenv from "dotenv";
import productsRouter from './routes/products.router.js';
import cartrouter from './routes/cart.router.js'
import viewrouter from './routes/views.router.js'
import chatRouter from "./routes/chat.router.js"
import { multiply } from "./views/helpers.js";
import { productModel } from "./dao/models/product.model.js";
import morgan from "morgan";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8080;
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));


app.engine("handlebars", handlebars.engine({
  helpers: {
    multiply: multiply,
  },
  defaultLayout: "main",
}));
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));




const httpServer = app.listen(`${PORT}`, () =>
    console.log("Server up in port 8080 !"));
    console.log (DB_USERNAME)
    console.log (DB_NAME)
  await mongoose.connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_NAME}.i602mg0.mongodb.net/?retryWrites=true&w=majority`
  );
  // const products = await productModel.paginate({category:"bazar"},{limit:5, page:1})

  socket.connect(httpServer)


app.use("/chat",chatRouter);
app.use("/", viewrouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartrouter);




