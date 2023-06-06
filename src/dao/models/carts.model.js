import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = mongoose.Schema({
  products: [
    {
      _id: false,
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required:true,
      },
    },
  ],
});
cartsSchema.pre("findOne",function(){
  this.populate("products.productId");
})
const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
