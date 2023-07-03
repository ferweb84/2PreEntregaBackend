import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true
    },
    description: String,
    price: Number,
    status: {
        type: Number,
        enum: [0, 1],
        default: 1
    },
    code: {
        type: Number,
        unique: true
    },
    stock: Number,
    category: String,
    thumbnails: [{
        type: String
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
    }
});

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema);

export { productModel };