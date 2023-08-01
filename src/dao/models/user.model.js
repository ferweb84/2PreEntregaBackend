import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    role: {
        type: String,
        default: "user",
        emun: ['user', 'admin', 'premium']
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    documents: [
        {
        _id: false,
        name: { type: String },
        reference: { type: String }
        }
    ],
    last_connection: Date,
    status: Array
    })

const userModel = mongoose.model(userCollection, userSchema);

export { userModel };