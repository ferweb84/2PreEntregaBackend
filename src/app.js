import express from "express";
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";
import socket from './socket.js';
import dotenv from "dotenv";
import productsRouter from './routes/products.router.js';
import cartrouter from './routes/cart.router.js';
import viewrouter from './routes/views.router.js';
import chatRouter from "./routes/chat.router.js";
import database from "./db.js"

const app = express();


app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));


app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));


const httpServer = app.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
        
    } catch (error) {
        console.log(error);
    }
});

database.connect()
// app.use("/chat",chat.router);
app.use("/", viewrouter);
app.use("/api/products", productsRouter);

app.use("/api/carts", cartrouter);
socket.connect(httpServer)


