const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);
router.route("/navbar").get(protect, getUserProfile);

module.exports = router;
