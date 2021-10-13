const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { readContent, updateContent } = require("../controllers/mailController");

const router = express.Router();

router
  .route("/mailcontent")
  .get(protect, readContent)
  .put(protect, updateContent);

module.exports = router;
