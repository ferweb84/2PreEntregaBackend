import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const cookieCollection = "cookies";

const cookieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});
cookieSchema.plugin(mongoosePaginate);
let cookieModel = mongoose.model(cookieCollection, cookieSchema);

export {cookieModel} ;