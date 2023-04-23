import dotenv from "dotenv"
dotenv.config();
const user = process.env.user;
const password = process.env.password;
const database=process.env.database;
const secret=process.env.SESSION_SECRET

const config ={
    dbUrl:`mongodb+srv://${user}:${password}@${database}.i602mg0.mongodb.net/?retryWrites=true&w=majority`,
    sessionSecret: secret,
}
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