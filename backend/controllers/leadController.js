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

exports.getLead = (req, res) => {
  return res.json(req.lead);
};

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

//comeback here
exports.updateLead = (req, res) => { 
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "problem with updation",
      });
    }

    //updation code
    let lead = req.lead;
    lead = _.extend(lead, fields);

    //save to the DB
    lead.save((err, updatedLead) => {
      if (err || !updatedLead) {
        return res.status(400).json({
          error: "Falied to update lead",
        });
      }
      return res.json(updatedLead);
    });
  });
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
        console.log(err)
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

exports.deleteManyLeads = (req, res) =>{
  //
}