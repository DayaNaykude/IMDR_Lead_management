const Lead = require("../models/lead");
const formidable = require("formidable");
const _ = require("lodash");
const { validationResult } = require("express-validator");

exports.getLeadById = (req, res, next, id) => {
  Lead.findById(id).exec((err, lead) => {
    if (err || !lead) {
      return res.status(400).json({
        error: "No lead found.",
      });
    }
    req.lead = lead;
    next();
  });
};

//get a lead details
exports.getLead = (req, res) => {
  const { emailId } = req.body;

  Lead.findOne({ email: emailId }, (err, lead) => {
    if (err || !lead) {
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }

    return res.json(lead);
  });
};

// get all leads
exports.getAllLeads = (req, res) => {
  Lead.find({ user: req.profile._id })
    .sort([["createdAt", "desc"]])
    .exec((err, leads) => {
      if (err || !leads) {
        return res.status(400).json({
          error: "No leads assigned.",
        });
      }
      return res.json(leads);
    });
};

//Add Contact
exports.createLead = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  const lead = new Lead(req.body);
  lead.save((err, lead) => {
    if (err || !lead) {
      console.log(err);
      return res.status(400).json({
        error: "falied to save lead in db",
      });
    }
    Lead.findByIdAndUpdate(
      { _id: lead._id },
      { $set: { user: req.profile._id } },
      { new: true, useFindAndModify: false },
      (err, lead) => {
        if (err || !lead) {
          return res.status(400).json({
            error: "Teacher is not assigned to this lead",
          });
        }
        res.json(lead);
      }
    );
  });
};

//update lead
exports.updateLead = (req, res) => {
  Lead.findOneAndUpdate(
    { email: req.body.emailId },
    { $set: req.body },
    { new: true },

    (err, lead) => {
      if (err || !lead) {
        return res.status(400).json({
          error: "Lead updation failed",
        });
      } else {
        return res.json({
          message: "updation of done successfully !",
        });
      }
      console.log("updatedLead");
    }
  );
};

exports.getStatus = (req, res) => {
  return res.send(req.lead.status);
};

exports.updateLeadStatus = (req, res) => {
  Lead.findByIdAndUpdate(
    { _id: req.lead._id },
    { $set: { status: req.body.status } },
    { new: true, useFindAndModify: false },
    (err, lead) => {
      if (err || !Lead) {
        console.log(err);
        return res.status(400).json({
          error: "Failed to update status of lead",
        });
      }
      return res.json(lead);
    }
  );
};

//delete
exports.deleteManyLeads = (req, res) => {
  const jsonObj = req.body;
  var result = [];

  for (var i in jsonObj) result.push(jsonObj[i]);
  console.log(result.length);
  console.log(result);
  result.map((email) => {
    Lead.findOneAndRemove({ email: email }).exec((err, lead) => {
      if (err || !lead) {
        return res.status(400).json({
          error: "Can't delete lead",
        });
      }
      if (lead && lead.email === result[result.length - 1]) {
        return res.json({
          message: "Selected leads have been deleted successfully",
        });
      }
    });
  });
};
