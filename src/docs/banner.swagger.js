/**
 * @swagger
 * /api/banner:
 *   get:
 *     summary: Get the active banner
 *     tags: [Banner]
 *     responses:
 *       200:
 *         description: Active banner data returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: "50% Off Electronics Sale!"
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 link:
 *                   type: string
 *                   example: "/category/electronics"
 *                 backgroundColor:
 *                   type: string
 *                   example: "#4F46E5"
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/banner:
 *   put:
 *     summary: Update or create banner (Admin only)
 *     tags: [Banner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *               link:
 *                 type: string
 *               backgroundColor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Banner updated successfully
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Access denied. Admins only.
 *       500:
 *         description: Server error
 */
