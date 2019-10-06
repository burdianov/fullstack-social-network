const express = require("express");
const {
    getPosts,
    createPost,
    getPostsByUser,
    postById,
    isPoster,
    updatePost,
    deletePost
} = require("../controllers/post");
const {requireSignIn} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {createPostValidator} = require("../validators");

const router = express.Router();

router.get("/posts", getPosts);
router.post("/post/new/:userId",
    requireSignIn,
    createPost,
    createPostValidator);
router.get("/posts/by/:userId", getPostsByUser);
router.put("/post/:postId", requireSignIn, isPoster, updatePost);
router.delete("/post/:postId", requireSignIn, isPoster, deletePost);

// for any route containing :userId, the app will first execute userById()
router.param("userId", userById);
// for any route containing :postId, the app will first execute postById()
router.param("postId", postById);

module.exports = router;