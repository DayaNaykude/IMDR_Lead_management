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
  var id;
  var username;
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
          leads.map((lead) => {
            lead.user = users[i++ % users.length]._id;
          });
          Lead.create(leads, function (err, documents) {
            if (err) {
              let email = err.keyValue.email;
              return res.json({
                email: email,
                error: " Duplicate emails.",
              });
            }
            let count = leads.length;

            return res.json({
              count: count,
              message: " leads have been successfully uploaded.",
            });
          });
        });
      });
  });
};
