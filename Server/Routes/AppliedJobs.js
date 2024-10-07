const express = require('express');
const {createAppliedJob,deleteAppliedJob,getAppliedJobById,getAllAppliedJobs,updateAppliedJob} = require('../Controller/AppliedJobs');
const router = express.Router();



router.post('/', createAppliedJob);
router.get('/', getAllAppliedJobs);
router.get('/:id', getAppliedJobById);
// router.put('/:id', updateProduct);
router.delete('/:id', deleteAppliedJob);

module.exports = router;
