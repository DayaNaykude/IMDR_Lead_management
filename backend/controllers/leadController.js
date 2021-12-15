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

// get all active leads for a particular user
exports.getAllLeads = (req, res) => {
  Lead.find(
    { user: req.profile._id, flag: "Active" },
    {
      applicantName: 1,
      email: 1,
      mobile: 1,
      createdAt: 1,
      city: 1,
      source: 1,
      percentileGK: 1,
      status: 1,
      entrance: 1,
    }
  )
    .sort([["updatedAt", "desc"]])
    .exec((err, leads) => {
      if (err || !leads) {
        return res.status(400).json({
          error: "No leads assigned.",
        });
      }
      return res.json(leads);
    });
};

// get all active leads for an admin
exports.getAllLeadsForAdmin = (req, res) => {
  Lead.find(
    { flag: "Active" },
    {
      applicantName: 1,
      email: 1,
      mobile: 1,
      createdAt: 1,
      city: 1,
      source: 1,
      percentileGK: 1,
      status: 1,
      entrance: 1,
    }
  )
    .populate("user", "username")
    .sort([["updatedAt", "desc"]])
    .exec((err, leads) => {
      if (err || !leads) {
        return res.status(400).json({
          error: "No leads FOUND",
        });
      }
      return res.json(leads);
    });
};

// get all trashed leads
exports.getAllTrashedLeads = (req, res) => {
  Lead.find(
    { flag: "Deactive" },
    {
      applicantName: 1,
      email: 1,
      mobile: 1,
      createdAt: 1,
      city: 1,
      source: 1,
      percentileGK: 1,
      status: 1,
      entrance: 1,
    }
  )
    .populate("user", "username")
    .sort([["updatedAt", "desc"]])
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

//update status
exports.updateStatus = (req, res) => {
  let review = [];

  review.push({
    status: req.body.status,
    comment: req.body.comment,
    createdAt: new Date(),
  });

  if (req.body.status === "level 1") {
    Lead.findOneAndUpdate(
      { email: req.body.emailId },
      {
        $set: { status: req.body.status, level_1_date: new Date() },
        $push: { reviews: review },
      },
      { new: true },
      (err, lead) => {
        if (err || !lead) {
          console.log("in error");
          return res.status(400).json({
            error: "Unable to update",
          });
        } else {
          return res.json({
            message: "update lead status successfully",
          });
        }
      }
    );
  } else if (req.body.status === "level 2") {
    Lead.findOneAndUpdate(
      { email: req.body.emailId },
      {
        $set: { status: req.body.status, level_2_date: new Date() },
        $push: { reviews: review },
      },
      { new: true },
      (err, lead) => {
        if (err || !lead) {
          console.log("in error");
          return res.status(400).json({
            error: "Unable to update",
          });
        } else {
          return res.json({
            message: "update lead status successfully",
          });
        }
      }
    );
  } else if (req.body.status === "level 3") {
    Lead.findOneAndUpdate(
      { email: req.body.emailId },
      {
        $set: { status: req.body.status, level_3_date: new Date() },
        $push: { reviews: review },
      },
      { new: true },
      (err, lead) => {
        if (err || !lead) {
          console.log("in error");
          return res.status(400).json({
            error: "Unable to update",
          });
        } else {
          return res.json({
            message: "update lead status successfully",
          });
        }
      }
    );
  } else {
    Lead.findOneAndUpdate(
      { email: req.body.emailId },
      {
        $set: { status: req.body.status, level_4_date: new Date() },
        $push: { reviews: review },
      },
      { new: true },
      (err, lead) => {
        if (err || !lead) {
          console.log("in error");
          return res.status(400).json({
            error: "Unable to update",
          });
        } else {
          return res.json({
            message: "update lead status successfully",
          });
        }
      }
    );
  }
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

exports.deleteLead = (req, res) => {
  let lead = req.lead;
  lead.remove((err, deletedLead) => {
    if (err || !deletedLead) {
      return res.status(400).json({
        error: "Lead can't be deleted.",
        lead,
      });
    }
    return res.json({
      message: "Lead is deleted successfully",
    });
  });
};

//permanent deletion
exports.deleteManyLeads = (req, res) => {
  const jsonObj = req.body;
  var result = [];

  for (var i in jsonObj) result.push(jsonObj[i]);
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

//move leads into trash
exports.moveLeadsIntoTrash = (req, res) => {
  const jsonObj = req.body;
  var result = [];

  for (var i in jsonObj) result.push(jsonObj[i]);
  result.map((email) => {
    Lead.findOneAndUpdate(
      { email: email },
      { $set: { flag: "Deactive" } },
      { new: true, useFindAndModify: false },
      (err, lead) => {
        if (err || !Lead) {
          console.log(err);
          return res.status(400).json({
            error: "Failed To Move Leads Into Trash",
          });
        }
        if (lead && lead.email === result[result.length - 1]) {
          return res.json({
            message: "Selected leads are moved to trash successfully",
          });
        }
      }
    );
  });
};

//Re-assign lead to its previuos user
exports.reAssignLeadsToSameUser = (req, res) => {
  const jsonObj = req.body;
  var result = [];

  for (var i in jsonObj) result.push(jsonObj[i]);
  result.map((email) => {
    Lead.findOneAndUpdate(
      { email: email },
      { $set: { flag: "Active" } },
      { new: true, useFindAndModify: false },
      (err, lead) => {
        if (err || !Lead) {
          console.log(err);
          return res.status(400).json({
            error: "Failed To Re-assign Leads",
          });
        }
        if (lead && lead.email === result[result.length - 1]) {
          return res.json({
            message:
              "Selected leads are Re-assigned To It's Previous User successfully",
          });
        }
      }
    );
  });
};
