const express = require("express");
const {getPosts, createPost, getPostsByUser} = require("../controllers/post");
const {requireSignIn} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {createPostValidator} = require("../validators");

const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId",
    requireSignIn,
    createPost,
    createPostValidator);
router.get("/posts/by/:userId", getPostsByUser);

// for any route containing :userId, the app will first execute userById()
router.param("userId", userById);

module.exports = router;