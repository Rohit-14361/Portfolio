const Project = require('../models/Project');

const getProjects = async (req, res) => {
  try {
    let projects;
    if (req.user.role === 'admin') {
      projects = await Project.find({}).populate('user', 'name email');
    } else {
      projects = await Project.find({ user: req.user._id });
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { projectName, requestDetails, userId, investmentAmount, projectStatus, paymentStatus } = req.body;
    
    // If Admin, they can assign a user and set details directly
    if (req.user.role === 'admin') {
      const project = new Project({
        user: userId || req.user._id,
        projectName,
        requestDetails,
        investmentAmount: investmentAmount || 0,
        projectStatus: projectStatus || 'pending',
        paymentStatus: paymentStatus || 'pending'
      });
      const createdProject = await project.save();
      return res.status(201).json(createdProject);
    }

    // Standard User requesting a project
    const project = new Project({
      user: req.user._id,
      projectName,
      requestDetails,
      investmentAmount: 0,
      projectStatus: 'pending',
      paymentStatus: 'pending'
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { projectName, requestDetails, investmentAmount, projectStatus, paymentStatus } = req.body;
    
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (req.user.role === 'admin') {
      project.projectName = projectName || project.projectName;
      project.requestDetails = requestDetails || project.requestDetails;
      if (investmentAmount !== undefined) project.investmentAmount = investmentAmount;
      if (projectStatus !== undefined) project.projectStatus = projectStatus;
      if (paymentStatus !== undefined) project.paymentStatus = paymentStatus;
    } else {
      // Users can only update their own project request details if it's pending
      if (project.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      if (project.projectStatus !== 'pending') {
        return res.status(400).json({ message: 'Cannot edit an in-progress or completed project' });
      }
      project.projectName = projectName || project.projectName;
      project.requestDetails = requestDetails || project.requestDetails;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
};
