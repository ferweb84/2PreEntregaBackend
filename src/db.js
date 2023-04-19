import mongoose from "mongoose";
import config from "./config.js";
const {dbUrl}=config
const database ={
    connect: async function () {
        try {
            await mongoose.connect(dbUrl)
        } catch (error) {
            console.log(error)
        }
    }
}
export default database;


// import mongoose from "mongoose";
// import config from "./config.js";

// const { DB_USERNAME, DB_PASSWORD, DB_NAME } = config;

// const database = {
//   connect: async () => {
//     try {
//       await mongoose.connect(
//         `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_NAME}.i602mg0.mongodb.net/?retryWrites=true&w=majority`
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   },
// };

// export default database;