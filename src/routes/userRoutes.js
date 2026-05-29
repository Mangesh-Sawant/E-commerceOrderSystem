const express = require("express");

const { logIn , registerUser} = require("../controllers/userController");

const router = express.Router();

router.post("/login", logIn);

router.post("/register", registerUser);

module.exports = router;