const express = require('express');
const {getPosts, createPost} = require('../controllers/post');
const validators = require('../validators');

const router = express.Router();

router.get('/', getPosts);
router.post('/post', validators.createPostValidator, createPost);

module.exports = router;