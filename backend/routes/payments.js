const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, razorpayWebhook } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/payments/create-order
// @desc    Create Razorpay Order
// @access  Private
router.post('/create-order', protect, createOrder);

// @route   POST /api/payments/verify
// @desc    Verify Razorpay payment
// @access  Private
router.post('/verify', protect, verifyPayment);

// @route   POST /api/payments/webhook
// @desc    Razorpay Webhook (payment.captured event) — raw body is set in index.js
// @access  Public (verified via Razorpay signature)
router.post('/webhook', razorpayWebhook);

module.exports = router;
