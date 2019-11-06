const express = require("express");
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  userPhoto,
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople,
  hasAuthorization
} = require("../controllers/user");
const {requireSignIn} = require("../controllers/auth");

const router = express.Router();

router.put("/user/follow", requireSignIn, addFollowing, addFollower);
router.put("/user/unfollow", requireSignIn, removeFollowing, removeFollower);

router.get("/users", allUsers);
router.get("/user/:userId", requireSignIn, getUser);
router.put("/user/:userId", requireSignIn, hasAuthorization, updateUser);
router.delete("/user/:userId", requireSignIn, hasAuthorization, deleteUser);
router.get("/user/photo/:userId", userPhoto);

// who to follow
router.get("/user/findpeople/:userId", requireSignIn, findPeople);

// for any route containing :userId, the app will first execute userById()
router.param("userId", userById);

module.exports = router;