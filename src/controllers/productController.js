const Product = require("../models/Product")

const getProducts = async (req, res) => {
    try {
        // Read query params from URL
        // e.g. GET /api/products?search=shoes&category=clothing&page=2&limit=5
        const { search, category, page = 1, limit = 10 } = req.query;

        // Build the filter object dynamically
        const filter = {};

        // search: case-insensitive partial match on title
        // $regex = pattern matching, like SQL LIKE
        // $options: "i" = case insensitive (Shoes = shoes = SHOES)
        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        // category: exact match filter
        if (category) {
            filter.category = category;
        }

        // Pagination math:
        // page=2, limit=10 → skip first 10 results → show results 11-20
        const skip = (Number(page) - 1) * Number(limit);

        // Count total matching products (for frontend to know total pages)
        const total = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .skip(skip)          // skip previous pages
            .limit(Number(limit)) // only return this many per page
            .sort({ createdAt: -1 }); // newest first

        res.status(200).json({
            total,                        // total matching products
            page: Number(page),           // current page
            totalPages: Math.ceil(total / Number(limit)), // how many pages exist
            products
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
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