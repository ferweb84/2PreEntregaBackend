import { Router } from "express";

//vamos a configurar la respuesta del Manager
import MessagesManager from "../dao/filesManagers/messagesManager.js";

//LOS MANAGER SE ENCARGAN DE LA LOGICA - LOS ROUTERS DE EXPONER LOS ENDPOINTS

//creamos una nueva instancia del MessagesManager (es la que va a contener todos nuestros Metodos en este caso el findAll y create ) y esa nueva instancia la guardamos en una variable que se llame const messagesManager
const messagesManager = new MessagesManager();

//llamamos a Router y lo vamos a colocar en una variable router con minuscula 
const router = Router();

// creamos una ruta que nos permita trater todos los mensajes 
// hacemos que esta funcion sea Asincrona (async) y usamos el await (nos aparecen los metodos) y los resultados lo guardamos en una constante que se llame messages y lo retornes 
router.get("/",async(req,res)=>{
    const messages =await messagesManager.findAll();
    return res.send({status:"success",payload:messages});
});

//primero vamos a traer lo que tengamos en el body con el req.body y luego creamos una variable para crear el mensaje, llamando a nuestro Manager que no se nos olvide poner el async y el await. Y retornamos el mensaje 
router.post("/",async (req,res)=>{
    const message = req.body;
    const createdMessage= await messagesManager.create (message);
    return res.send ({status:"success", payload: createdMessage}); 
});


//nunca olvidar de exportar 
export default router;
