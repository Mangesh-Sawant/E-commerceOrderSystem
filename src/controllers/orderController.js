const ORDER_STATUS = require("../constants/orderStatus");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        // 1. get cart
        const cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let totalAmount = 0;
        let orderItems = [];

        // 2. validate stock + calculate price
        for (let item of cart.items) {
            const product = item.productId;

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.title}`
                });
            }

            // calculate total
            totalAmount += product.price * item.quantity;

            orderItems.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        // 3. create order
        const order = await Order.create({
            userId,
            items: orderItems,
            totalAmount,
            status: ORDER_STATUS.CONFIRMED
        });

        // 4. reduce stock
        for (let item of cart.items) {
            await Product.findByIdAndUpdate(item.productId._id, {
                $inc: { stock: -item.quantity }
            });
        }

        // 5. clear cart
        cart.items = [];
        await cart.save();

        return res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ userId })
            .populate("items.productId")
            .sort({ createdAt: -1 });

        return res.status(200).json(orders);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    placeOrder,
    getOrders
};