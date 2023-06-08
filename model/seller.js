import { Schema, model } from "mongoose";

const sellerSchema = new Schema({
  seller_id: { type: String, unique: true },
  seller_zip_code_prefix: { type: String },
  seller_city: { type: String, default: null },
  seller_state: { type: String, default: null },
});

export default model("seller", sellerSchema);
