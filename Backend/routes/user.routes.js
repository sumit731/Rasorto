import express from "express"
import { Login, Register } from "../controllers/user.controlller.js";

const userRouter = express.Router();

userRouter.post("/login", Login);
userRouter.post("/register", Register);

export default userRouter;