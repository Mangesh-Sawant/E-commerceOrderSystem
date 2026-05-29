/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get logged-in user order history
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                         price:
 *                           type: number
 *                   totalAmount:
 *                     type: number
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place an order from cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           productId:
 *                             type: string
 *                           quantity:
 *                             type: number
 *                           price:
 *                             type: number
 *                     totalAmount:
 *                       type: number
 *                     status:
 *                       type: string
 *       400:
 *         description: Cart empty or stock not enough
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *         example: "65a1f2b9c1234567890abcd"
 *     responses:
 *       200:
 *         description: Order details
 *       403:
 *         description: Not authorized to view this order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   put:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID to cancel
 *         example: "65a1f2b9c1234567890abcd"
 *     responses:
 *       200:
 *         description: Order cancelled, stock restored
 *       400:
 *         description: Cannot cancel (already shipped or delivered)
 *       403:
 *         description: Not authorized to cancel this order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */