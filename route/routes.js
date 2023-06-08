import dotenv from "dotenv";
import { connect } from "../config/database.js";
import express from "express";
import auth from "../middleware/auth.js";
import {
  orderItems,
  orderItem,
  deletOrderItem,
} from "../controller/orderController.js";
import { login, updateSellerDetails } from "../controller/userController.js";

dotenv.config();
connect();
const route = express();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.post("/login", login);
route.post("/account", auth, updateSellerDetails);
route.get("/order_items", auth, orderItems);
route.delete("/order_items/:id", auth, deletOrderItem);
route.get("/order_item", auth, orderItem);

export { route };
