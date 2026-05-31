const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/isAdmin.middleware');

router.get('/', announcementController.getAnnouncement);
router.post('/', protect, isAdmin, announcementController.updateAnnouncement);

module.exports = router;
