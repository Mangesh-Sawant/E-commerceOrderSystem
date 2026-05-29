/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications for logged-in user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Latest notifications returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unreadCount:
 *                   type: integer
 *                   example: 3
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                         example: "Order Update"
 *                       message:
 *                         type: string
 *                         example: "Your order status has been updated to: shipped"
 *                       isRead:
 *                         type: boolean
 *                         example: false
 *                       type:
 *                         type: string
 *                         example: "order"
 *                       createdAt:
 *                         type: string
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/notifications/read:
 *   put:
 *     summary: Mark all notifications as read for logged-in user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Server error
 */
