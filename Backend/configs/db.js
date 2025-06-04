import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("DB Connected");
    }
    catch (error) {
        console.log(error);
    }
}

export default connectDB;