import mongoose from "mongoose";

const orderCollection= "Orders";

const orderSchema = new mongoose.Schema({
    number:Number,
    business:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Businesses",
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Users",
    },
    status: {
        type: String,
        default: "pending",
    },
    products:[],
    
});

export const orderModel = mongoose.model(orderCollection,orderSchema);