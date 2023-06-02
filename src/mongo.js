import mongoose from "mongoose";
import config from "./config/config.js";

const {
  mongo: { url },
} = config;

const database = {
  connect: async () => {
    try {
      await mongoose.connect(url);
      console.log("MongoDB Connected");
    } catch (error) {
      console.log(error);
    }
  },
};

export default database;