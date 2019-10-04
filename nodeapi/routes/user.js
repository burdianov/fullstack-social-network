const express = require("express");
const {userById, allUsers} = require("../controllers/user");

const router = express.Router();

router.get("/users", allUsers);

// for any route containing :userId, the app will first execute userById()
router.param("userId", userById);

module.exports = router;