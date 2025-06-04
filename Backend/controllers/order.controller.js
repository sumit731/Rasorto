import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placeing user order for frontend
const placeOrder = async (req, res) => {
    const { userId, items, amount, address } = req.body;
    const frontend_url = "http://localhost:5173" || "http://localhost:5174";
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        const newOrder = new Order({
            userId: userId,
            items: items,
            amount: amount,
            address: address,
        });
        const order = await newOrder.save();
        await User.findByIdAndUpdate(req.body.userId, {cartData: {}});

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2*100*80
            },
            quantity:1
        })
        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.status(200).json({ success: true, message: "Order Placed Successfully", data: order, session: session.url });
    } catch (error) {
        res.status(400).json({ success: false, message: "Something went wrong" });
    }
};

const verifyOrder = async(req, res) => {
    const {orderId, success} = req.body;
    try{
        if(success == "true"){
            await Order.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Paid"})
        }
        else{
            await Order.findByIdAndDelete(orderId);
            res.json({success: false, message: "Payment Failed"})
        }
    }
    catch(error){
        res.status(400).json({success: false, message: "Something went wrong"})
    }
}

// user orders for frontend
const userOrders = async(req, res) => {
    try{
        const orders = await Order.find({userId: req.body.userId});
        res.status(200).json({success: true, message: "Orders", data: orders});
    }
    catch(error){
        res.status(400).json({success: false, message: "Something went wrong"});
    }
}

const listOrder = async(req, res) => {
    try{
        const orders = await Order.find({});
        res.status(200).json({success: true, data: orders});
    }
    catch(error){
        res.status(400).json({success: false, message: "Something went wrong"});
    }
}

const updateStatus = async(req, res) => {
    try{
        await Order.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.status(200).json({success: true, message: "Status Updated"});
    }
    catch(error){
        res.status(400).json({success: false, message: "Something went wrong"});
    }
}

export {placeOrder, verifyOrder, userOrders, listOrder, updateStatus};