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
      return res.status(400).json({
        error: "problem with file",
      });
    }

    // finding userId using username
    
    // username = fields.name;
    // console.log(username);
    // userModel.findOne({username}).exec((err,user)=>{
    //   if(err || !user){
    //     return res.status(400).json({
    //       error: "No user found with given name"
    //     })
    //   }
    //   id = user._id;
    //   console.log(id);
    // })
   
    data = fs.readFileSync(files.csv.path);
    csv
      .fromString(data.toString(), {
        headers: true,
        ignoreEmpty: true,
      })
      .on("data", function (data) {
        data["_id"] = new mongoose.Types.ObjectId();
        data.source = fields.source;
        leads.push(data);
      })
      .on("end", function () {
        Lead.create(leads, function (err, documents) {
          if (err) {
            let email = err.keyValue.email;

            return res.json({
              error: "Duplicate email.",
              email,
            });
          }
          res.send(leads.length + " leads have been successfully uploaded.");
        });
      });
  });
};
