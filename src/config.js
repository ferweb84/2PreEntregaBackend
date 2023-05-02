import dotenv from "dotenv"
dotenv.config();
const user = process.env.user;
const password = process.env.password;
const database=process.env.database;
const secret=process.env.sessionSecret

const config ={
    dbUrl:`mongodb+srv://${user}:${password}@${database}.i602mg0.mongodb.net/?retryWrites=true&w=majority`,
    sessionSecret: secret,

    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackUrl:process.env.CALLBACK_URL
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