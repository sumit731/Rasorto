import express from "express";
import connectDB from "./configs/db.js";
import cors from "cors";
import foodRouter from "./routes/food.routes.js";
import userRouter from "./routes/user.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";

//app configs
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for form data
app.use(cors());

//api endpoint
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

app.listen(PORT, () => {
    //db connection
    connectDB();
    console.log("Server is running on port: ", PORT);
})