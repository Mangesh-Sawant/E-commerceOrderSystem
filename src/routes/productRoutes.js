const express = require("express");

const router = express.Router();

const Product = require("../models/Product");


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
});


/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 */
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created
 */
router.post("/", async (req, res) => {
    try {
        const { title, price, description, stock } = req.body;

        const product = await Product.create({
            title, price, description, stock
        });

        res.status(201).json({
            message: "Project Created Successfully",
            product
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct =
            await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const existingProduct = await Product.findById(id);

        const products = await Product.findByIdAndDelete(id);

        if (!products) {
            return res.status(400).json({
                message: "Product Not Exists"
            });
        }

        res.status(200).send("Deleted successfully");
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
});

module.exports = router;;