var express = require("express");
var router = express.Router();
const Lead = require("../models/lead");
const { check } = require("express-validator");

const {
  getLeadById,
  getLead,
  getAllLeads,
  createLead,
  updateLead,
  updateStatus,
  deleteManyLeads,
  getAllTrashedLeads,
  getAllLeadsForAdmin,
  reAssignLeadsToSameUser,
  moveLeadsIntoTrash,
} = require("../controllers/leadController");
const { getUserById } = require("../middleware/authMiddleware");

//params
router.param("leadId", getLeadById);
router.param("userId", getUserById);

//actual routes

//read
router.get("/leads/:userId", getAllLeads);
router.get("/admin/leads", getAllLeadsForAdmin);
router.get("/trashedLeads", getAllTrashedLeads);

//create
router.post(
  "/lead/create/:userId",
  [
    check("applicantName", "Name should be atleast 3 characters.")
      .not()
      .isEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 }),
    check("dateOfBirth").not().isEmpty().withMessage("Birth Date is required"),
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email")
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          Lead.findOne({ email: req.body.email }, function (err, lead) {
            if (err) {
              reject(new Error("Server Error"));
            }
            if (Boolean(lead)) {
              reject(new Error("E-mail already in use"));
            }
            resolve(true);
          });
        });
      }),
    check("gender").not().isEmpty().withMessage("Gender is required"),
  ],
  createLead
);

//view details
router.post("/lead/:userId", getLead);

//update lead
router.put("/lead/update/:userId", updateLead);

//update lead status
router.put("/lead/updateStatus/:userId", updateStatus);

//move leads into trash
router.put("/lead/moveIntoTrash/:userId", moveLeadsIntoTrash);

//reAssign leads to their respective users
router.put("/lead/reAssign/:userId", reAssignLeadsToSameUser);

//permanent delete
router.delete("/deleteLeads/:userId", deleteManyLeads);

module.exports = router;
