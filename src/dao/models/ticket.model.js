import mongoose from "mongoose";

const ticketCollection = 'tickets';
const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
    },
    amount: {
        type: Number,
    },
    purchaser: {
        type: String
    },
    created_at: {
        type: String
    },
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export { ticketModel };