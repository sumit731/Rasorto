import User from "../models/user.model.js";

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Ensure userId and itemId are provided
        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "userId and itemId are required" });
        }

        // Find the user by ID (use findById not findOne)
        let userData = await User.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Access or initialize cartData
        let cartData = userData.cartData;

        // Add or update the item in the cart
        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        // Update user's cartData in the database
        await User.findByIdAndUpdate(userId, { cartData });

        return res.status(200).json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.error("Add to Cart Error:", error);
        return res.status(500).json({ success: false, message: "Something went wrong in add to cart" });
    }
};



const removeFromCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.userId);
        let cartData = userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await User.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).json({ success: true, message: "Removed From Cart" });
    }
    catch (error) {
        console.log("remove is giving error")
        res.status(400).json({ success: false, message: "something went wrong" })
    }
}

const getCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.status(200).json({ success: true,cartData});
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Something went wrong" });
    }
}

export { addToCart, removeFromCart, getCart };