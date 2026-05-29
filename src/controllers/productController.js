const Product = require("../models/Product")

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};

const getProductById =async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { title, price, description, stock } = req.body;

        const product = await Product.create({
            title,
            price,
            description,
            stock,
        });

        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};