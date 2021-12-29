var express = require("express");
var router = express.Router();
const Lead = require("../models/lead");
const { check } = require("express-validator");
var moment = require("moment");
const validatePhoneNumber = require("validate-phone-number-node-js");

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
    check("dateOfBirth")
      .not()
      .isEmpty()
      .withMessage("Birth Date is required")
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          var years = moment().diff(req.body.dateOfBirth, "years");
          if (years < 18) {
            reject(new Error("Invalid Birth-Date. Age Should Be Greater Than 18."));
          }
          resolve(true);
        });
      }),
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
    check("mobile").custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        // Regular expression to check if string is a Indian mobile number
        const regexExp = /^[6-9]\d{9}$/gi;

        // String with Indian mobile number
        const str = req.body.mobile;

        var result = true;
        if (req.body.mobile !== "") {
          result = regexExp.test(str); 
        }

        if (!result) {
          reject(new Error("Enter A Valid Mobile Number."));
        }
        resolve(true);
      });
    }),
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
