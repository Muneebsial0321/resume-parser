const express = require('express');
const {createResume,deleteResume,getAllResumes,getResumeById,updateResume
} = require('../Controller/Resumes');
const router = express.Router();
const upload = require("../Middleware/Upload");



router.post('/:jobId',upload.single("file"), createResume);
router.get('/', getAllResumes);
router.get('/:id', getResumeById);
// router.put('/:id', updateProduct);
router.delete('/:id', deleteResume);

module.exports = router;
