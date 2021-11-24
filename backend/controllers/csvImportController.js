const Lead = require("../models/lead");
const userModel = require("../models/userModel");
var csv = require("fast-csv");
var mongoose = require("mongoose");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

//uploading leads into db
exports.uploadFile = (req, res) => {
  
  let data;
  var leads = [];

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "problem with file",
      });
    }

    const { source, entrance } = fields;

    data = fs.readFileSync(files.csv.path);
    csv
      .fromString(data.toString(), {
        headers: true,
        ignoreEmpty: true,
      })
      .on("data", function (data) {
        data["_id"] = new mongoose.Types.ObjectId();
        data.source = source;
        data.entrance = entrance;
        leads.push(data);
      })
      .on("end", function () {
        userModel.find({ isAdmin: false }).exec((err, users) => {
          if (err || !users) {
            return res.status(400).json({
              error: "No user present",
            });
          }
          var i = 0;

          const uniqueLeads = [];
          const map = new Map();
          for (const lead of leads) {
            if (!map.has(lead.email)) {
              map.set(lead.email, true); // set any value to Map
              uniqueLeads.push(lead);
            }
          }
          const len = uniqueLeads.length;
         // console.log(len);
          if (len > 0) {
            uniqueLeads.map((lead) => {
              Lead.findOne({ email: lead.email }).exec((err, f_lead) => {
                if (err || !f_lead) {
                  lead.user = users[i++ % users.length]._id;
                  Lead.create(lead, function (error, document) {
                    if (error) {
                      console.log(error);
                      return res.json({
                        error: " Duplicate emails.",
                      });
                    }
                    if (document.email === uniqueLeads[len - 1].email) {
                      return res.json({
                        message: " leads have been uploaded successfully.",
                      });
                    }
                  });
                }

                if (f_lead && f_lead.email === uniqueLeads[len - 1].email) {
                  return res.json({
                    message: " leads have been uploaded successfully.",
                  });
                }
              });
            });
          } else {
            return res.json({
              message: " leads have been uploaded successfully.",
            });
          }
        });
      });
  });
};
