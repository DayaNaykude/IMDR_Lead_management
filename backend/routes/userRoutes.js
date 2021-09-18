const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);

module.exports = router;
