const express = require("express");
const router = express.Router();

const { getUserById } = require("../middleware/authMiddleware");
const { uploadFile } = require("../controllers/csvImportController");

//params
router.param("userId", getUserById);

//actual routes
router.post("/upload", uploadFile);

module.exports = router;
