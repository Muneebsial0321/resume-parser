const express = require('express');
const {createUser,getAllUser
} = require('../Controller/User');
const router = express.Router();



router.post('/', createUser);
router.get('/', getAllUser);
// router.put('/:id', updateProduct);

module.exports = router;
