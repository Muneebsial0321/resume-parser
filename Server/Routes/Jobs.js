const express = require('express');
const {createJob,deleteJob,getAllJobs,getJobById} = require('../Controller/Jobs');
const router = express.Router();



router.post('/', createJob);
router.get('/', getAllJobs);
router.get('/:id',getJobById);
// router.put('/:id', updateProduct);
router.delete('/:id', deleteJob);

module.exports = router;
