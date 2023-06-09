import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  product_id: { type: String, unique: true },
  product_category_name: { type: String, default: null },
  product_name_lenght: { type: Number, default: null },
  product_description_lenght: { type: Number, default: null },
  product_photos_qty: { type: Number, default: null },
  product_weight_g: { type: Number, default: null, default: null },
  product_length_cm: { type: Number, default: null, default: null },
  product_height_cm: { type: Number, default: null },
  product_width_cm: { type: Number, default: null },
});
export default model("olist_products_dataset", ProductSchema);
