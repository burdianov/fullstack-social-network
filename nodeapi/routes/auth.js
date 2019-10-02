const express = require('express');
const {signUp, signIn, signOut} = require('../controllers/auth');
const {userSignupValidator} = require('../validators');

const router = express.Router();

router.post('/signup', userSignupValidator, signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);

module.exports = router;