const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateUserProfile,
} = require("../controllers/userController");
const router = express.Router();

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/").get(protect, admin, getUsers);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

module.exports = router;
