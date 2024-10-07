const express = require('express');
const {createResume,deleteResume,getAllResumes,getResumeById,updateResume
} = require('../Controller/Resumes');
const router = express.Router();



router.post('/', createResume);
router.get('/', getAllResumes);
router.get('/:id', getResumeById);
// router.put('/:id', updateProduct);
router.delete('/:id', deleteResume);

module.exports = router;
