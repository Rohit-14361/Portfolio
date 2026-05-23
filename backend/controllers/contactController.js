const ContactUs = require('../models/ContactUs');
const { sendContactEmailToAdmin, sendContactEmailToUser } = require('../utils/emailService');

// @desc  Submit a contact form
// @route POST /api/contact
// @access Public
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save to DB
    const contact = await ContactUs.create({ name, email, message });

    // Send emails
    try {
      await Promise.all([
        sendContactEmailToAdmin({ name, email, message }),
        sendContactEmailToUser({ name, email, message }),
      ]);
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr.message);
      return res.status(500).json({
        message: 'Message saved, but email could not be sent. Please check email configuration.',
        error: emailErr.message,
      });
    }

    res.status(201).json({ message: 'Message sent successfully!', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get all contact submissions (Admin only)
// @route GET /api/contact
// @access Private/Admin
const getContacts = async (req, res) => {
  try {
    const contacts = await ContactUs.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update contact status (Admin only)
// @route PUT /api/contact/:id
// @access Private/Admin
const updateContactStatus = async (req, res) => {
  try {
    const contact = await ContactUs.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    contact.status = req.body.status || contact.status;
    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitContact, getContacts, updateContactStatus };
