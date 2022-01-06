const Lead = require("../models/lead");
const { validationResult } = require("express-validator");

//parameter extractor for a lead
exports.getLeadById = (req, res, next, id) => {
  Lead.findById(id).exec((err, lead) => {
    if (err || !lead) {
      return res.status(400).json({
        error: "No Lead Found.",
      });
    }
    req.lead = lead;
    next();
  });
};

//get lead details
exports.getLead = (req, res) => {
  const { emailId } = req.body;

  Lead.findOne({ email: emailId }, (err, lead) => {
    if (err || !lead) {
      return res.status(400).json({
        error: "User Does Not Exists.",
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
      reviews: 1,
    }
  )
    .sort([["updatedAt", "desc"]])
    .exec((err, leads) => {
      if (err || !leads) {
        return res.status(400).json({
          error: "No Leads Assigned.",
        });
      }
      return res.json(leads);
    });
};

//Create Lead Manually
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
      return res.status(400).json({
        error: "Falied To Save Lead In DB.",
      });
    }
    Lead.findByIdAndUpdate(
      { _id: lead._id },
      { $set: { user: req.profile._id } },
      { new: true, useFindAndModify: false },
      (err, lead) => {
        if (err || !lead) {
          return res.status(400).json({
            error: "User Is Not Assigned To This Lead.",
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
          error: "Lead Updation Failed.",
        });
      } else {
        return res.json({
          message: "Lead Updated Successfully.",
        });
      }
    }
  );
};

//update status and review
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
          return res.status(400).json({
            error: "Unable To Update.",
          });
        } else {
          return res.json({
            message: "Lead Status Updated Successfully.",
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
          return res.status(400).json({
            error: "Unable To Update.",
          });
        } else {
          return res.json({
            message: "Lead Status Updated Successfully.",
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
          return res.status(400).json({
            error: "Unable To Update.",
          });
        } else {
          return res.json({
            message: "Lead Status Updated Successfully.",
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
          return res.status(400).json({
            error: "Unable To Update.",
          });
        } else {
          return res.json({
            message: "Lead Status Updated Successfully.",
          });
        }
      }
    );
  }
};

//permanent deletion
exports.deleteManyLeads = (req, res) => {
  const jsonObj = req.body;
  var result = [];

  for (var i in jsonObj) result.push(jsonObj[i]);
  result.map((_id) => {
    Lead.findOneAndRemove({ _id: _id }).exec((err, lead) => {
      if (err || !lead) {
        return res.status(400).json({
          error: "Deletion Failed.",
        });
      }
      if (lead && lead._id == result[result.length - 1]) {
        return res.json({
          message: "Selected Leads Have Been Deleted Successfully.",
        });
      }
    });
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
          error: "No Leads Present In Trash.",
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
          error: "No Leads Found.",
        });
      }
      return res.json(leads);
    });
};

//Re-assign leads to their respective users
exports.reAssignLeadsToSameUser = (req, res) => {
  const jsonObj = req.body;
  var result = [];

  for (var i in jsonObj) result.push(jsonObj[i]);
  result.map((_id) => {
    Lead.findOneAndUpdate(
      { _id: _id },
      { $set: { flag: "Active" } },
      { new: true, useFindAndModify: false },
      (err, lead) => {
        if (err || !lead) {
          return res.status(400).json({
            error: "Failed To Re-assign Leads.",
          });
        }
        if (lead && lead._id == result[result.length - 1]) {
          return res.json({
            message:
              "Selected Leads Are Re-assigned To Their Respective Users Successfully.",
          });
        }
      }
    );
  });
};

//move leads into trash
exports.moveLeadsIntoTrash = (req, res) => {
  const jsonObj = req.body;
  var result = [];

  for (var i in jsonObj) result.push(jsonObj[i]);
  result.map((_id) => {
    Lead.findOneAndUpdate(
      { _id: _id },
      { $set: { flag: "Deactive" } },
      { new: true, useFindAndModify: false },
      (err, lead) => {
        if (err || !lead) {
          return res.status(400).json({
            error: "Failed To Move Leads Into Trash.",
          });
        }
        if (lead && lead._id == result[result.length - 1]) {
          return res.json({
            message: "Selected Leads Are Moved Into Trash Successfully.",
          });
        }
      }
    );
  });
};
