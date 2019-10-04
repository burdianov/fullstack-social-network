const express = require("express");
const {signUp, signIn, signOut} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {userSignupValidator} = require("../validators");

const router = express.Router();

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);

// for any route containing :userId, the app will first execute userById()
router.param("userId", userById);

module.exports = router;