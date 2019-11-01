const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
  socialLogin
} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {
  userSignupValidator,
  passwordResetValidator
} = require("../validators");

const router = express.Router();

router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);
router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.post("/social-login", socialLogin);

// for any route containing :userId, the app will first execute userById()
router.param("userId", userById);

module.exports = router;