const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      default: '',
    },
    liveLink: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const PortfolioItem = mongoose.model('PortfolioItem', portfolioItemSchema);
module.exports = PortfolioItem;
