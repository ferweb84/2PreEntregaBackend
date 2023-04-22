
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
  size: {
    type: String,
    enum: ["small", "medium", "large"],
    default: "medium",
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
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  thumbnails: Array
});
productSchema.plugin(mongoosePaginate);
let productModel = mongoose.model(productCollection, productSchema);



export {productModel} ;
