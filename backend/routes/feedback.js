const express = require('express');
const router = express.Router();

const { submitFeedback, getFeedback } = require('../controllers/feedbackController');

// @route POST /api/feedback
router.post('/', submitFeedback);

// @route GET /api/feedback
router.get('/', getFeedback);

module.exports = router;

