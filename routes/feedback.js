const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbacks } = require('../controllers/feedbackController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add', authMiddleware, createFeedback);
router.get('/', authMiddleware, getFeedbacks);

module.exports = router;