const express = require('express');
const {dataExtractions,predictProfession,scoreCheck} = require('../Controller/Info');
const router = express.Router();



router.post('/', dataExtractions);
router.post('/skills', predictProfession);
router.get('/',scoreCheck );
// router.get('/:id',getJobById);
// // router.put('/:id', updateProduct);
// router.delete('/:id', deleteJob);

module.exports = router;
