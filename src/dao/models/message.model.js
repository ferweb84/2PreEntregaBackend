import mongoose from "mongoose";

const messageCollection ="Message";

//el esquema de nuestra estructura de modelo de mensaje
const messageSchema = new mongoose.Schema({
    chating: {
        type:String,
        required: true,
    }
});
const messageModel= mongoose.model(messageCollection, messageSchema);

export {messageModel};