import express from "express";
import multer from "multer";
import { AddFood, FoodList, RemoveFood } from "../controllers/food.controllers.js";
const foodRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), AddFood);
foodRouter.get("/list", FoodList);
foodRouter.post("/remove", RemoveFood);

export default foodRouter;