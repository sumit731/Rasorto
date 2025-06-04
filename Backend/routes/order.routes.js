import express from "express";
import authMiddleware from "../middleware/auth.js";
import { listOrder, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/order.controller.js";
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrder);
orderRouter.post("/status", updateStatus);

export default orderRouter;