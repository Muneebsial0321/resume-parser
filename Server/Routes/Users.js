const express = require('express');
const {createUser,getAllUser,login
} = require('../Controller/User');
const router = express.Router();



router.post('/signup', createUser);
router.post('/login', login);
router.get('/', getAllUser);

module.exports = router;
