const Product = require("../models/Product");
const Cart = require("../models/Cart");

const addToCart  = async (req , res ) =>{
    try{
        const userId = req.user.id;
        const {productId , quantity} = req.body;

        // check product exists
        const product = await Product.findById(productId);

        if(!product){
            return res.status(400).json({message: "Product not found"});
        }
        
        // check stock
        if(product.stock < quantity){
            return res.status(400).json({message: "Not enough stock"});
        }

        // find cart
        let cart = await Cart.findOne({userId});


        if(!cart){
            cart = new Cart({
                userId,
                items:[{productId,quantity}]
            })

            await cart.save();

            return res.status(201).json({
                message:"Cart Created and item added",
                cart
            });
        }
        
        const existingItem = cart.items.find((item)=> item.productId.toString() === productId);

        if(existingItem){
            const newQty = existingItem.quantity + quantity;

            if(product.stock < newQty){
                return res.status(400).json({
                    message: "Not enough stock for updated qunatity"
                });
            }
            existingItem.quantity = newQty;
        }else{
            cart.items.push({productId,quantity});
        }

        await cart.save();

        return res.status(200).json({
            message: "Cart updated succesfully",
            cart
        });

    }
    catch (error){
        return res.status(500).json({ message: error.message });
    }
}

const getCart  = async (req , res ) =>{
    try{
        const userId = req.user.id;
        const cart = await Cart.findOne({userId}).populate("items.productId");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        return res.status(200).json(cart);
    }
    catch (error){
         return res.status(500).json({ message: error.message });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        // find cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // check if item exists in cart
        const itemExists = cart.items.find((item) => item.productId.toString() === productId);

        if (!itemExists) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // remove the item using filter (keeps everything except the matching productId)
        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

        await cart.save();

        return res.status(200).json({
            message: "Item removed from cart",
            cart
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        // find cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // find the item inside cart
        const existingItem = cart.items.find((item) => item.productId.toString() === productId);

        if (!existingItem) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // check stock against new quantity
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Not enough stock" });
        }

        // update quantity (replace, not add)
        existingItem.quantity = quantity;

        await cart.save();

        return res.status(200).json({
            message: "Cart item updated",
            cart
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    updateCartItem
};