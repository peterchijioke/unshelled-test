import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema({
  order_id: { type: String, unique: true },
  order_item_id: { type: Number },
  seller_id: { type: String, unique: true },
  shipping_limit_date: { type: Date, default: null },
  price: { type: Number },
  freight_value: { type: mongoose.Types.Decimal128 },
});

export default model("olist_order_items_dataset", orderSchema);
