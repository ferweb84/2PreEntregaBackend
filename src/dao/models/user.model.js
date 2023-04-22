import mongoose from "mongoose";

const userCollection ="User";

//el esquema de nuestra estructura de modelo de usuario
const userSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        unique:true,
    },

  last_name: String,
  age: Number,
  password: String,


});
const userModel= mongoose.model(userCollection, userSchema);

export {userModel};

