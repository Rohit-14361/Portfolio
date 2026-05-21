const PortfolioItem = require('../models/PortfolioItem');

const getPortfolioItems = async (req, res) => {
  try {
    const items = await PortfolioItem.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPortfolioItem = async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveLink } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageUrl = req.file.path; // from cloudinary

    const portfolioItem = new PortfolioItem({
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      imageUrl,
    });

    const createdItem = await portfolioItem.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePortfolioItem = async (req, res) => {
  try {
    const item = await PortfolioItem.findById(req.params.id);

    if (item) {
      await item.deleteOne();
      res.json({ message: 'Item removed' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePortfolioItem = async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveLink } = req.body;
    const item = await PortfolioItem.findById(req.params.id);

    if (item) {
      item.title = title || item.title;
      item.description = description || item.description;
      item.techStack = techStack || item.techStack;
      item.githubLink = githubLink !== undefined ? githubLink : item.githubLink;
      item.liveLink = liveLink !== undefined ? liveLink : item.liveLink;
      
      if (req.file) {
        item.imageUrl = req.file.path;
      }

      const updatedItem = await item.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPortfolioItems,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
};
