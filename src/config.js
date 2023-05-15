import dotenv from "dotenv"
dotenv.config();
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database=process.env.DB_NAME;


const config ={
    dbUrl: `mongodb+srv://${user}:${password}@${database}.i602mg0.mongodb.net/?retryWrites=true&w=majority`,
    JWT_SECRET: process.env.JWT_SECRET,
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackUrl:process.env.CALLBACK_URL
}
export default config