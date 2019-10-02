const express = require('express');
const {signUp} = require('../controllers/auth');
const {userSignupValidator} = require('../validators');

const router = express.Router();

router.post('/signup', userSignupValidator, signUp);

module.exports = router;