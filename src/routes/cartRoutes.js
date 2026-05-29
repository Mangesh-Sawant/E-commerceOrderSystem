const express = require("express");
const {addToCart,getCart} = require("../controllers/cartController")

const router =  express.Router();


/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "65a1f2b9c1234567890abcd"
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Cart created or item added
 *       200:
 *         description: Cart updated
 *       400:
 *         description: Bad request (product not found or stock issue)
 *       500:
 *         description: Server error
 */
router.post("/add", addToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Server error
 */
router.get("/", getCart);

module.exports = router;