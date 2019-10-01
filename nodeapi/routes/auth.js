const express = require('express');
const {signUp} = require('../controllers/auth');
// const validators = require('../validators');

const router = express.Router();

router.post('/signup', signUp);

module.exports = router;