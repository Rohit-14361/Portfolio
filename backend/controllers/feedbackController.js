const Feedback = require('../models/Feedback');

// @desc Submit feedback/testimonial
// @route POST /api/feedback
// @access Public
const submitFeedback = async (req, res) => {
  try {
    const { name, role, message, rating } = req.body;

    if (!name || !message) {
      return res.status(400).json({ message: 'Name and message are required' });
    }

    const feedback = await Feedback.create({
      name,
      role,
      message,
      rating: rating ?? 5,
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get feedback/testimonials (latest)
// @route GET /api/feedback
// @access Public
const getFeedback = async (req, res) => {
  try {
    const { limit } = req.query;
    const parsedLimit = limit ? Math.max(parseInt(limit, 10), 1) : 50;

    const feedback = await Feedback.find({ status: 'approved' })
      .sort({ createdAt: -1 })
      .limit(parsedLimit);

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitFeedback, getFeedback };

