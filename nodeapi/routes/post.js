const express = require('express');
const {getPosts, createPost} = require('../controllers/post');
const {requireSignIn} = require('../controllers/auth');
const {createPostValidator} = require('../validators');

const router = express.Router();

router.get('/', requireSignIn, getPosts);
router.post('/post', createPostValidator, createPost);

module.exports = router;