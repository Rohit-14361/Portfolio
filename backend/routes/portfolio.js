const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const { protect, admin } = require('../middleware/authMiddleware');
const { getPortfolioItems, createPortfolioItem, updatePortfolioItem, deletePortfolioItem } = require('../controllers/portfolioController');

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio',
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
  },
});

const upload = multer({ storage: storage });

// @route   GET /api/portfolio
// @desc    Get all portfolio items
// @access  Public
router.get('/', getPortfolioItems);

// @route   POST /api/portfolio
// @desc    Create a portfolio item
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), createPortfolioItem);

// @route   PUT /api/portfolio/:id
// @desc    Update a portfolio item
// @access  Private/Admin
router.put('/:id', protect, admin, upload.single('image'), updatePortfolioItem);

// @route   DELETE /api/portfolio/:id
// @desc    Delete a portfolio item
// @access  Private/Admin
router.delete('/:id', protect, admin, deletePortfolioItem);

module.exports = router;
