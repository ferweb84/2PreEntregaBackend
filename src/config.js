//importamos el dotenv (informacion sensible que no podemos subir al repositorio, lo utilizamos para que se quede en nuestro equipo)
import dotenv from "dotenv"
//configurar para proteger nuestras credenciales con ayuda de las variables de entorno; gracias a esta dependencia podemos ir a .env a guardar y vamos a nuestro servidor 8080 y ponemos console.log(process.env.password)
dotenv.config();

//estas variables las utilizo para reemplazar en mongoos.connect el usuario y la contraseña para que no aparezcan y no exponemos nuestra base de datos
const user = process.env.user;
const password = process.env.password;
const database=process.env.database;
const secret=process.env.SESSION_SECRET

const config ={
    dbUrl:`mongodb+srv://${user}:${password}@${database}.i602mg0.mongodb.net/?retryWrites=true&w=majority`,
    sessionSecret: secret,
};

export default config


// import dotenv from "dotenv";
// dotenv.config();

// const config = {
//     PORT: process.env.PORT || 8080,
//     DB_NAME: process.env.DB_NAME,
//     DB_USERNAME: process.env.DB_USERNAME,
//     DB_PASSWORD: process.env.DB_PASSWORD
    
// };

// export default config;