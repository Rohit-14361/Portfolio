const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware');
const { getServices, createService, updateService, deleteService } = require('../controllers/serviceController');

// @route   GET /api/services
// @desc    Get all services
// @access  Public
router.get('/', getServices);

// @route   POST /api/services
// @desc    Create a service
// @access  Private/Admin
router.post('/', protect, admin, createService);

// @route   PUT /api/services/:id
// @desc    Update a service
// @access  Private/Admin
router.put('/:id', protect, admin, updateService);

// @route   DELETE /api/services/:id
// @desc    Delete a service
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteService);

module.exports = router;
