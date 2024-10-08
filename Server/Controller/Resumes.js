// controllers/resumeController.js
const Resume = require('../Modals/Resumes');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');
const AppliedJob = require('../Modals/AppliedJobs');

const createResume = async (req, res) => {
  try {
    const filePath = path.join(req.file.path);
    const userId =req.cookies.user
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    // Send the extracted text back to the client
    const pdfContent = data.text 
    const resume = new Resume({...req.body,pdfContent,userId});
    const savedResume = await resume.save();

    const appliedJob = new AppliedJob({jobId:req.params.jobId,resumeId:resume._id})
    res.json({savedResume,appliedJob});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateResume = async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate before updating
    });
    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(req.params.id);
    if (!deletedResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
