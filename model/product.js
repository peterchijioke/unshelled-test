import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  product_id: { type: String, unique: true },
  product_category_name: { type: String, default: null },
  product_name_lenght: { type: Number },
  product_description_lenght: { type: Number },
  product_photos_qty: { type: Number },
  product_weight_g: { type: Number },
  product_length_cm: { type: Number },
  product_height_cm: { type: Number },
  product_width_cm: { type: Number },
});
export default model("olist_products_dataset", ProductSchema);
