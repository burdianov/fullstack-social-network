const express = require("express");
const {
  getPosts,
  createPost,
  getPostsByUser,
  postById,
  isPoster,
  updatePost,
  deletePost,
  getPostPhoto,
  getPost,
  like,
  unlike
} = require("../controllers/post");
const {requireSignIn} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {createPostValidator} = require("../validators");

const router = express.Router();

router.get("/posts", getPosts);
router.put("/post/like", requireSignIn, like);
router.put("/post/unlike", requireSignIn, unlike);
router.post("/post/new/:userId",
  requireSignIn,
  createPost,
  createPostValidator);
router.get("/posts/by/:userId", getPostsByUser);
router.get("/post/:postId", getPost);
router.put("/post/:postId", requireSignIn, isPoster, updatePost);
router.delete("/post/:postId", requireSignIn, isPoster, deletePost);
router.get("/post/photo/:postId", getPostPhoto);

// for any route containing :userId, the app will first execute userById()
router.param("userId", userById);
// for any route containing :postId, the app will first execute postById()
router.param("postId", postById);

module.exports = router;