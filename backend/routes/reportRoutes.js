const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { getReport, getReportData } = require("../controllers/reportController");
const router = express.Router();

router.route("/").post(protect, admin, getReport);
router.route("/getdata").post(protect, admin, getReportData);

module.exports = router;
