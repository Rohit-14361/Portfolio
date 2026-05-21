const express = require('express');
const router = express.Router();
const { submitContact, getContacts, updateContactStatus } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/contact
// @desc    Submit contact form (public)
// @access  Public
router.post('/', submitContact);

// @route   GET /api/contact
// @desc    Get all contacts (admin only)
// @access  Private/Admin
router.get('/', protect, admin, getContacts);

// @route   PUT /api/contact/:id
// @desc    Update contact status (admin only)
// @access  Private/Admin
router.put('/:id', protect, admin, updateContactStatus);

module.exports = router;
