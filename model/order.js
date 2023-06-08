import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema({
  order_id: { type: String, unique: true },
  order_item_id: { type: Number },
  product_id: { type: String, default: null },
  seller_id: { type: String, unique: true },
  shipping_limit_date: { type: Date, default: null },
  price: { type: Number, default: null },
  freight_value: { type: Number, default: null },
});

export default model("olist_order_items_dataset", orderSchema);
