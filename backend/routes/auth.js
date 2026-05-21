const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/auth/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', loginUser);

// @route   GET /api/auth/users
// @desc    Get all users (for admin dropdown)
// @access  Private/Admin
router.get('/users', protect, admin, getUsers);

module.exports = router;

