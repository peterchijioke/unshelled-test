import dotenv from "dotenv";
import { connect } from "../config/database.js";
import express from "express";
import auth from "../middleware/auth.js";
import { orderItems, orderItem } from "../controller/orderController.js";
import { login } from "../controller/userController.js";

dotenv.config();
connect();

const route = express();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));
route.post("/login", login);
route.post("/order_items", auth, orderItems);
route.post("/order_items/:id", auth, orderItem);

export { route };
