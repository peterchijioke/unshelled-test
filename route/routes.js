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
route.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

route.use(express.urlencoded({ extended: true }));
route.get("/order_items", auth, orderItems);
route.get("/order_item", auth, orderItem);
route.post("/login", login);
route.post("/account", auth, updateSellerDetails);
route.delete("/order_items/:id", auth, deletOrderItem);

export { route };
