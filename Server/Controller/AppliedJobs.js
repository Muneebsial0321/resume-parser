// controllers/appliedJobController.js
const AppliedJob = require('../Modals/AppliedJobs');

const createAppliedJob = async (req, res) => {
  try {
    const appliedJob = new AppliedJob(req.body);
    const savedAppliedJob = await appliedJob.save();
    res.json(savedAppliedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAppliedJobs = async (req, res) => {
  try {
    const appliedJobs = await AppliedJob.find();
    res.json(appliedJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAppliedJobById = async (req, res) => {
  try {
    const appliedJob = await AppliedJob.findById(req.params.id);
    if (!appliedJob) {
      return res.status(404).json({ message: 'AppliedJob not found' });
    }
    res.status(200).json(appliedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAppliedJob = async (req, res) => {
  try {
    const updatedAppliedJob = await AppliedJob.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate before updating
    });
    if (!updatedAppliedJob) {
      return res.status(404).json({ message: 'AppliedJob not found' });
    }
    res.status(200).json(updatedAppliedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAppliedJob = async (req, res) => {
  try {
    const deletedAppliedJob = await AppliedJob.findByIdAndDelete(req.params.id);
    if (!deletedAppliedJob) {
      return res.status(404).json({ message: 'AppliedJob not found' });
    }
    res.status(200).json({ message: 'AppliedJob deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAppliedJob,
  getAllAppliedJobs,
  getAppliedJobById,
  updateAppliedJob,
  deleteAppliedJob,
};
