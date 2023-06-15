import mongoose from "mongoose";

const ticketCollection = 'tickets';
const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
    },
    // purchase_datetime: {
    //     type: String
    // },
    amount: {
        type: Number,
    },
    purchaser: {
        type: String
    },
    created_at: {
        type: String
    }
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);