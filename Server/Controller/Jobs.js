// controllers/JobController.js
const AppliedJob = require('../Modals/AppliedJobs');
const Job = require('../Modals/Jobs');
const Resumes = require('../Modals/Resumes');


const createJob = async (req, res) => {
  try {
 
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.json({msg:"success",data:savedJob});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    const appliedJobs = await AppliedJob.find({jobId:job._id})
    const resumes = Promise.all(appliedJobs.map(async(e)=>{
      const resume = await Resumes.findById(e.resumeId)
      return resume
    }))
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({job,resumes});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate before updating
    });
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
