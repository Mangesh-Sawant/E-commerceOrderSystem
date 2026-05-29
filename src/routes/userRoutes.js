const express = require("express");

const { logIn, registerUser, forgotPassword, resetPassword } = require("../controllers/userController");

const router = express.Router();

router.post("/login", logIn);

router.post("/register", registerUser);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

module.exports = router;