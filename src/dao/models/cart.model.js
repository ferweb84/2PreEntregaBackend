import mongoose from "mongoose";

const cartCollection = "carts";
const cartSchema = mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: {
                type: Number
            }
        }
    ],
});

cartSchema.pre(["find", "findOne"], function () {
    this.populate("products.product");
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export { cartModel };