const fs = require("fs");
const asyncHandler = require("express-async-handler");

const filename = "./backend/utils/mailContent.txt";

exports.readContent = asyncHandler(async (req, res, next) => {
  fs.readFile(filename, "utf8", function (err, data) {
    if (err) {
      res.status(500);
      throw new Error(err.message);
    } else {
      res.status(200);
      res.json({ success: true, data: data });
    }
  });
});

exports.updateContent = asyncHandler(async (req, res, next) => {
  const { mailContent } = req.body;

  fs.writeFile(filename, mailContent, (err) => {
    if (err) {
      res.status(500);
      throw new Error(err.message);
    } else {
      res.status(200);
      res.json({ success: true, status: "Content updated successfully" });
    }
  });
});
