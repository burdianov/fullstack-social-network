const express = require('express');
const {signUp, signIn} = require('../controllers/auth');
const {userSignupValidator} = require('../validators');

const router = express.Router();

router.post('/signup', userSignupValidator, signUp);
router.post('/signin', signIn);

module.exports = router;