const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/projects
// @desc    Get all projects for Admin or user's projects for User
// @access  Private
router.get('/', protect, getProjects);

// @route   POST /api/projects
// @desc    Create a project request (User) or Create project directly (Admin)
// @access  Private
router.post('/', protect, createProject);

// @route   PUT /api/projects/:id
// @desc    Update project details (Admin only for most fields)
// @access  Private
router.put('/:id', protect, updateProject);

module.exports = router;
