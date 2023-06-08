import dotenv from "dotenv";
import { connect } from "../config/database.js";
import express from "express";
import auth from "../middleware/auth.js";
import { home, login } from "../controller/userController.js";

dotenv.config();
connect();

const route = express();
route.use(express.json());
route.post("/login", login);
route.post("/order_items", auth, home);

export { route };
