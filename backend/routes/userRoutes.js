const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  updateUserProfile,
  sendBulkEmails,
<<<<<<< HEAD
  sendBulkSms,
=======
>>>>>>> 57240ec405e72037c835e8ba9017c4ccc26f7bd5
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

router.route("/:email").delete(protect, admin, deleteUser);
router.route("/sendbulkemails").post(protect, sendBulkEmails);
<<<<<<< HEAD
router.route("/sendbulksms").post(protect, sendBulkSms);
=======
>>>>>>> 57240ec405e72037c835e8ba9017c4ccc26f7bd5

module.exports = router;
