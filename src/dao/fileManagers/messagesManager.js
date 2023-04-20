//importamos __dirname ruta absoluta desde utils
import __dirname from "../../utils.js";
//importamos fileSystem desde fileSystem
import fs from "fs";

//Manager tiene la logica - el router es el encargado de exponer los endpoints

//creamos una clase que siempre tiene un constructor que nos ayuda a definir  variables que hacen falta en esta clase THIS.PATH (el path hace referencia a una ruta, la ruta que se van a guardar los archivos, para eso importamos desde utils el __dirname (ruta absoluta) hacemos que busque en la carpeta files y los guarde como .json )
// los Manager son los encargados de hablar con nuestros archivos, tienen la logica del fileSystem , readFile writeFile.
//si no le digo al editor que exporte el manager al router no voy a poder configurar la respuesta  
export default class MessagesManager {
  constructor() {}

  saveMessage = async (data) => {
    const path = "./files/clientMsgs.json";
    try {
      const messages = await getMessages();
      messages.push(JSON.parse(data));
      await fs.promises.writeFile(path, JSON.stringify(messages, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };

   //ahora creamos el metodo findAll o getMessages(encontrar todos) que va a traer y leer todos los mensajes; debemos asegurarnos que el archivo exista (fs.existsSync) y le pasamos la variable this.path. Aca le preguntamos a fileSystem si en esa ruta existe algun archivo (if) y si, si existe que me lo traiga, sino (else) retorname (return)  un array vacio. 
  //Hacemos manejo de errores con el try(intenta hacer tal cosa) catch(sino atrapalo) (manejo de errores) . usamos el catch para asegurarnos que nuestro servidor no se rompa (atrape el error) en caso de que tenga un error. Ventaja de usarlo: si usamos una request (peticion) y tenemos un error vamos a tener que desactivar y volver a activar el servidor, con el try catch lo encapsula y nos deja seguir trabajando, me muestra el error por consola  
  //creamos una variable const messagesString (me lo va a traer en string)
  //utilizamos el await fs.promises cuanto utilizamos el fileSystem con funcionalidades asyncrona 
  //readfile para leer el archivo que se encuentra en esa ruta y en formato utf-8, esto me lo devuelve en string. Es incomodo para trabajar con un objeto entonces necesito transformarlo en un archivo de JSON lo parseamos y retornamos el messages.
  getMessages = async (logMsgs) => {
    const path = "../../files/clientMsgs.json";
    const dir = "../../files";
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      if (fs.existsSync(path)) {
        const clientMsgs = await fs.promises.readFile(path, "utf-8");
        const size = new Blob([clientMsgs]).size;
        if (size > 0) {
          const parsedMsgs = JSON.parse(clientMsgs);
          if (logMsgs === "log") {
            console.log(parsedMsgs);
          }
          return parsedMsgs;
        } else {
          return [];
        }
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
}