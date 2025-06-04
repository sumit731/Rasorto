import Food from "../models/food.model.js";
import fs from "fs";
const AddFood = async (req, res)=>{
    let image_filename = `${req.file.filename}`;

    const food = new Food({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try{
        await food.save();
        res.status(200).json({success: true, message: "Food Added Successfully"});
    }
    catch(error){
        console.log("addfood error", error);
        res.status(400).json({success: false, message: "Something went wrong"});
    }
}

const FoodList = async(req, res) => {
    try{
        const foods = await Food.find();
        res.status(200).json({success: true, message: "Food List", data: foods})
    }
    catch(error){
        res.status(400).json({success:false, message: "Something went wrong"})
    }
}

const RemoveFood = async(req, res) => {
    try{
        const food = await Food.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {})
        await Food.findByIdAndDelete(req.body.id);
        res.status(200).json({success: true, message: "Food Deleted Successfully"});
    }
    catch(error){
        res.status(400).json({success: false, message: "Something went wrong"});
    }
}


export {AddFood, FoodList, RemoveFood};