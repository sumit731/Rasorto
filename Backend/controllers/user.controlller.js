import jwt from 'jsonwebtoken'
import validator from "validator"
import bcrypt from "bcrypt"
import User from '../models/user.model.js'
import dotenv from "dotenv"
dotenv.config();

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//Login
const Login = async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success: false, message: "Incorrect password"});
        }
        const token = createToken(user._id);
        res.json({success: true, token});
    }
    catch(error){
        res.status(400).json({success: false, message: "Something went wrong"});
    }
}

//Register
const Register = async(req, res) => {
    const {name, email, password} = req.body;
    try{
        const exist = await User.findOne({email});
        if(exist){
            return res.status(400).json({success: false, message: "User already exists"});
        }
        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({success: false, message: "Invalid email"});
        }
        if(password.length < 8){
            return res.status(400).json({success: false, message: "Password must be at least 8 characters"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name:name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(200).json({success: true, message: "User registered successfully", token});
        }
        catch(error){
            res.status(400).json({success: false, message: "Something went wrong"});
        }
    }

export {Login, Register};