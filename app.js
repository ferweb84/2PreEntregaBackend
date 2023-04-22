import express from "express";
//importamos handlebars desde express-handlebars
import handlebars from 'express-handlebars'
//importamos desde util el dirname
import __dirname from "./utils.js";
import socket from './socket.js'
import mongoose from "mongoose";
//importamos el dotenv (informacion sensible que no podemos subir al repositorio, lo utilizamos para que se quede en nuestro equipo)
import dotenv from "dotenv";
// importamos, traemos las rutas a utilizar
import productsRouter from './routes/products.router.js';
import cartrouter from './routes/cart.router.js'
//importamos la ruta creada de views
import viewrouter from './routes/views.router.js'
import chatRouter from "./routes/chat.router.js"
import { multiply } from "./views/helpers.js";
import { productModel } from "./dao/models/product.model.js";
import morgan from "morgan";

//inicializamos la app, le damos la funcionalidad, se lo asignamos a express a la variable app
const app = express();

//utilizamos este middleware de esta aplicacion, para cuando generemos una request
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));


//Configurar handlebars motor de plantillas de express y lo Inicialices desde este comando handlebars.engine
app.engine("handlebars",handlebars.engine());
//le preguntamos donde van a estar las plantillas?  En views trayende el dirname desde utils.js - Lo importamos y creamos
app.set("views",`${__dirname}/views`);// ruta absoluta
app.set("view engine","handlebars"); // activamos el motor handlebars 
// de aca vamos a crear el main.handlebars {{{body}}} la instruccion para decirle qye yo quiero que me renderice en las otras plantillas que voy a crear 


app.use(express.static(`${__dirname}/public`));

// app.engine("handlebars", handlebars.engine({
//   helpers: {
//     multiply: multiply,
//   },
//   defaultLayout: "main",
// }));

//ponemos que nuestra app escuche por puerto 8080
const httpServer = app.listen(8080, () => {
  try {
      console.log("Servidor arriba en el puerto 8080");

  } catch (error) {
      console.log(error);
  }
});

database.connect();


//creamos las rutas aqui y le decimos que utilice el chat.router
app.use("/chat",chatRouter);
//creamos las rutas aqui y le decimos que utilice el views.router
app.use("/", viewrouter);
//creamos las rutas aqui y le decimos que utilice el products.router
app.use("/api/products", productsRouter);
//creamos las rutas aqui y le decimos que utilice el cart.router
app.use("/api/carts", cartrouter);

socket.connect(httpServer)



