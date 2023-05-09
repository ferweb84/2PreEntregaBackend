import express from "express";
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";
import socket from './socket.js';
import dotenv from "dotenv";
import productsRouter from './routes/products.router.js';
import cartrouter from './routes/cart.router.js';
import viewrouter from './routes/views.router.js';
import sessionsRouter from "./routes/sessions.router.js";
import database from "./db.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStorage from "session-file-store";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import config from "./config.js"
import passport from "passport";
import initializePassport from "./auth/passport.js";

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("trust proxy", 1)

app.use(session({
    store: MongoStore.create({
        mongoUrl:config.dbUrl,
        ttl:60
    }),
    resave:true, 
    saveUninitialized:false,
    secret:'secret',})
    );

app.use(passport.initialize());
app.use(passport.session());
initializePassport();

const fileStorage = FileStorage (session);

app.use (cookieParser("CoderClave18#$"));

app.use(express.static(`${__dirname}/public`));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

const httpServer = app.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
        
    } catch (error) {
        console.log(error);
    }
});

database.connect()
socket.connect(httpServer)

app.use("/", viewrouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartrouter);
app.use("/api/sessions", sessionsRouter);

app.use("/setCookie",(req,res)=>{
    res
    .cookie("CoderCookie", "Una cookie compleja",{signed:true}) 
    .send("Cookie created")
});


app.get("/getCookies", (req,res) =>{

res.send (req.signedCookies);
});

app.get ("/deleteCookie", (req, res)=>{
    res.clearCookie("CoderCookie").send ("Cookie Deleted");
});

app.get ("/mongostore",(req,res)=>{
    return res.send({
        status: "sucess",
        payload:"Yo sabia que te conocia, Te di un plato de avena en 1947 para q pintaras mi cocina y nunca la pintaste"
    });
})

app.get('/fileSessions',(req,res)=>{
    return res.send ({status: "success",payload: "hello"})
});

app.get ('/session', (req,res)=> {
    if (req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter}veces`)
    }
    
    else{req.session.counter=1;
    res.send('Bienvenido')}
});

app.get('/logout',(req,res)=>{
  
    req.session.destroy( err=>{
        if (!err) res.send ('Logout ok!')
        else res.send({status: 'Logout  ERROR', body:err})
    })
})

function auth (req, res, next){
    if (req.session?.user==='pepe' && req.session?.admin){
        return next();
    }

    return res.status(401).send('error de autorizacion');
}

app.get ("/private", auth,(req,res)=>{
    res.send("Si ves esto es porque ya te logueaste")
})

