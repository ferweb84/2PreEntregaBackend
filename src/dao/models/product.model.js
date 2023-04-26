
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["comestible", "bazar","limpieza"],
    default: "comestible",
  },
  stock: {
    type: Number,
    required: true,
  },
  thumbnails: {
    type: Array,
    default: [],
  },
});
productSchema.plugin(mongoosePaginate);
let productModel = mongoose.model(productCollection, productSchema);

export {productModel} ;