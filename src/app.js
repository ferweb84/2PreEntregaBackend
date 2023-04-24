import express from "express";
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";
import socket from './socket.js';
import dotenv from "dotenv";
import productsRouter from './routes/products.router.js';
import cartrouter from './routes/cart.router.js';
import viewrouter from './routes/views.router.js';
import chatRouter from "./routes/chat.router.js";
import database from "./db.js";
import cookieParser from "cookie-parser";
import session from "express-session";


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
//app.use("/chat",chatRouter);
app.use("/", viewrouter);
app.use("/api/products", productsRouter);

app.use("/api/carts", cartrouter);
socket.connect(httpServer)



//-----------------------------------//
//COOKIE (nunca poner informacion comprometida)

//creo el middleware
//le pongo sello a la cookie 
app.use (cookieParser("CoderClave18#$"));

//endpoint para crear la cookie
app.use("/setCookie",(req,res)=>{
    res
    // .cookie("CoderCookie", "Una cookie compleja", {maxAge: 10000})    //para que en 10 seguntdos se elimine
    .cookie("CoderCookie", "Una cookie compleja",{signed:true}) //le pongo en las opciones signed:true para el sello
    .send("Cookie created")
});

//endopoint para traer la cookie
app.get("/getCookies", (req,res) =>{
// res.send (req.cookies); //cuando le ponemos sello la cookie desaparece de nuestra consulta (req.cookie) y ponemos el (req.signedCookies) cuando alquien cambia el sello va a desaparecer y tenemos que volver a (req.cookie)
res.send (req.signedCookies);
});

//endpoint para borrar la cookie
app.get ("/deleteCookie", (req, res)=>{
    res.clearCookie("CoderCookie").send ("Cookie Deleted");
});

//Session middleware

app.use(session({
    secret:'secretCoder', 
    resave:true, 
    saveUninitialized:true }));


    //creamos endpoints
app.get ('/session', (req,res)=> {
    //si al conectarse la sesion ya existe, entonces aumentar el contador 
    if (req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter}veces`)
    }
    //si no hay aun una sesion para el usuario, entonces inicializar en 1
    else{req.session.counter=1;
    res.send('Bienvenido')}
});

//eliminar la session
app.get('/logout',(req,res)=>{
  
    req.session.destroy( err=>{
        if (!err) res.send ('Logout ok!')
        else res.send({status: 'Logout  ERROR', body:err})
    })
})

//Login session 
app.get ('/login',(req,res)=>{
  const {username, password}= req.query;
  if (username !== 'pepe' || password !== 'pepepass'){
    return res.send ('login fail');
  }
  req.session.user= username;
  req.session.admin = true;
  res.send ('login successful!');

})

//autenticaciones  - middleware de autenticacion recibe tres parametros
//tengo autorizacion a todo 
function auth (req, res, next){
    if (req.session?.user==='pepe' && req.session?.admin){
        return next();
    }
    //si el administrador no es pepe, no le des permiso
    return res.status(401).send('error de autorizacion');
}
//creamos un ENDPOINT QUE ESTE PROTEGIDO aca utilizamos el auth
app.get ("/private", auth,(req,res)=>{
    res.send("Si ves esto es porque ya te logueaste")
})