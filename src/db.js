import mongoose from "mongoose";
import config from "./config.js";
import { logger } from "./logger.js"

const { 
    mongo: { dbUrl } 
} = config;
const database = {
    connect: async function() {
        try {
            await mongoose.connect(dbUrl);
        } catch (error) {
            logger.error(error);
        }
    }
};

export default database;