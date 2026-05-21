const Razorpay = require('razorpay');
const crypto = require('crypto');
const Project = require('../models/Project');
const User = require('../models/User');
const { sendPaymentEmailToAdmin, sendPaymentEmailToUser } = require('../utils/emailService');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'test_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret',
});

const createOrder = async (req, res) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to pay for this project' });
    }

    if (project.investmentAmount <= 0) {
      return res.status(400).json({ message: 'Investment amount must be greater than 0' });
    }

    const options = {
      amount: project.investmentAmount * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${projectId}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: 'Failed to create Razorpay order' });
    }

    // Save order id to project
    project.razorpayOrderId = order.id;
    await project.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, projectId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const project = await Project.findById(projectId).populate('user', 'name email');
      if (project) {
        project.paymentStatus = 'completed';
        project.razorpayPaymentId = razorpay_payment_id;
        await project.save();

        // Send payment confirmation emails to both admin and user
        try {
          const emailData = {
            userName: project.user.name,
            userEmail: project.user.email,
            projectName: project.projectName,
            amount: project.investmentAmount,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
          };
          await Promise.all([
            sendPaymentEmailToAdmin(emailData),
            sendPaymentEmailToUser(emailData),
          ]);
        } catch (emailErr) {
          console.error('Payment email sending failed:', emailErr.message);
        }

        res.json({ message: 'Payment successful', project });
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Razorpay Webhook handler
const razorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    // req.body is a raw Buffer when express.raw() is used
    const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(JSON.stringify(req.body));

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret || 'webhook_secret')
      .update(rawBody)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: 'Invalid webhook signature' });
    }

    // Parse the JSON body from the raw Buffer
    const parsedBody = JSON.parse(rawBody.toString());
    const event = parsedBody.event;
    const payload = parsedBody.payload;

    if (event === 'payment.captured') {
      const paymentEntity = payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;
      const amount = paymentEntity.amount / 100; // convert paise to INR

      // Find the project by Razorpay order ID
      const project = await Project.findOne({ razorpayOrderId: orderId }).populate('user', 'name email');

      if (project && project.paymentStatus !== 'completed') {
        project.paymentStatus = 'completed';
        project.razorpayPaymentId = paymentId;
        await project.save();

        // Send emails via webhook as well
        try {
          const emailData = {
            userName: project.user.name,
            userEmail: project.user.email,
            projectName: project.projectName,
            amount,
            paymentId,
            orderId,
          };
          await Promise.all([
            sendPaymentEmailToAdmin(emailData),
            sendPaymentEmailToUser(emailData),
          ]);
        } catch (emailErr) {
          console.error('Webhook email error:', emailErr.message);
        }
      }
    }

    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  razorpayWebhook,
};
