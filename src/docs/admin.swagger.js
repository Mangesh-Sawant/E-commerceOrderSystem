/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users (without passwords)
 *       403:
 *         description: Access denied. Admins only.
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *         example: "65a1f2b9c1234567890abcd"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Cannot delete your own account
 *       403:
 *         description: Access denied. Admins only.
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Get all orders from all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders with user and product details
 *       403:
 *         description: Access denied. Admins only.
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/admin/orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *         example: "65a1f2b9c1234567890abcd"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, shipped, delivered, cancelled]
 *                 example: "shipped"
 *     responses:
 *       200:
 *         description: Order status updated
 *       400:
 *         description: Invalid status value
 *       403:
 *         description: Access denied. Admins only.
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get admin dashboard stats (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                   example: 120
 *                 totalOrders:
 *                   type: integer
 *                   example: 340
 *                 totalRevenue:
 *                   type: number
 *                   example: 85000
 *                 ordersByStatus:
 *                   type: object
 *       403:
 *         description: Access denied. Admins only.
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/admin/users/create-admin:
 *   post:
 *     summary: Create a new admin account (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: User with this email already exists
 *       403:
 *         description: Access denied. Admins only.
 *       500:
 *         description: Server error
 */
