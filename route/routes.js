// importing user context
import dotenv from "dotenv";
import { connect } from "../config/database.js";
import express from "express";
import auth from "../middleware/auth.js";
import { home, login, register } from "../controller/userController.js";
dotenv.config();
connect();
const route = express();
route.use(express.json());
route.post("/register", register);
route.post("/login", login);
route.post("/welcome", auth, home);

export { route };
