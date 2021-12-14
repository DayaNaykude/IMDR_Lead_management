const User = require("../models/userModel");
const Lead = require("../models/lead");
const asyncHandler = require("express-async-handler");
const PromisePool = require("@supercharge/promise-pool");
const { sendEmail } = require("../utils/sendEmail");
// const { sendEmail } = require("../utils/mailgun");
const crypto = require("crypto");
const fs = require("fs");
const { sendSms } = require("../utils/sendSms");
const moment = require("moment");

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User with this email already exists");
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.status(200);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      sendgridemail: user.sendgridemail,
      isAdmin: user.isAdmin,
      token: user.getSignedJwtToken(),
    });

    // sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401);
      throw new Error("User does not exists !");
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials !");
    }
    res.status(201);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      sendgridemail: user.sendgridemail,
      isAdmin: user.isAdmin,
      token: user.getSignedJwtToken(),
    });
    // sendToken(user, 201, res);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    // next(error);
  }
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      throw new Error("Email could not be sent");
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

    try {
      const mailstatus = true;
      // const mailstatus = await sendEmail({
      //   from: "admissions2022@imdr.edu",
      //   to: user.email,

      //   template: "resetpass",
      //   data: {
      //     username: user.username,
      //     resetpassURL: resetUrl,
      //     subject: "Password Reset Request IMDR LMS",
      //   },
      // });
      console.log(resetPassMail);
      if (mailstatus) {
        res.status(200);
        res.json({ success: true, data: "Email Sent" });
      } else {
        throw new Error("Email could not be sent");
      }
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      res.status(500);
      throw new Error("Email could not be sent");
    }
  } catch (err) {
    next(err);
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Compare token in URL params to hashed token

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error("Invalid Token");
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.status(201).json({
      success: true,
      data: "Password Updated Successfully",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      sendgridemail: user.sendgridemail,
      contact: user.contact,
      bio: user.bio,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found !");
  }
});

// @desc    Get all users
// @route   GET /api/users/userslist
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.params.id);
  console.log(req.params.id);
  const user = await User.findOne({ email: req.params.id });

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.id });

  if (user) {
    user.sendgridemail = req.body.sendgridemail;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      sendgridemail: updatedUser.sendgridemail,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc  Update user profile
// @route  PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.contact) {
      user.contact = req.body.contact;
    }
    if (req.body.bio) {
      user.bio = req.body.bio;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      contact: updatedUser.contact,
      bio: updatedUser.bio,
      isAdmin: updatedUser.isAdmin,
      token: updatedUser.getSignedJwtToken(),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found !");
  }
});

exports.sendBulkEmails = asyncHandler(async (req, res, next) => {
  const { usersendgridemail, emails, subject } = req.body;

  let failedMails = [];

  let counter = 0;
  let length = emails.length;

  // const asyncRes = await Promise.all(

  const { results, errors } = await PromisePool.withConcurrency(20)
    .for(emails)
    .process(async (mailid, index) => {
      // emails.map(async (mailid) => {
      const lead = await Lead.findOne({ email: mailid });
      if (lead) {
        try {
          // const mailstatus = true;

          // const mailstatus = await sendEmail({
          //   from: usersendgridemail,
          //   to: lead.email,

          //   // html: firstMail,
          //   template: "firstmail",
          //   data: {
          //     applicantName: lead.applicantName,
          //     subject: subject,
          //   },
          // });
          // console.log(subject);

          console.log(mailstatus);
          if (mailstatus) {
            // if (lead.status == "level 0") {
            //   lead.status = "level 1";
            // }
            // const review = {
            //   status: lead.status,
            //   comment: `Mail with subject ${subject} sent`,
            // };

            // lead.reviews.push(review);
            ++counter;

            // await lead.save();
          } else {
            failedMails.push(mailid);
          }
        } catch (err) {
          console.log(err);
          failedMails.push(mailid);
        }
      } else {
        failedMails.push(mailid);
      }
    });

  let successMails = emails.filter((x) => failedMails.indexOf(x) == -1);
  await Lead.updateMany(
    { email: { $in: successMails } },
    {
      $push: {
        reviews: {
          comment: `Mail with subject ${subject} sent`,
          status: "level 1",
        },
      },
      $set: { status: "level 1", level_1_date: new Date() },
    },

    { multi: true }
  );

  console.log("results: ", results);

  res.status(200);
  res.send({
    failed: failedMails,
    data: `${counter} /${length} Emails sent`,
  });
});

exports.sendBulkSms = asyncHandler(async (req, res, next) => {
  const { emails, numbers, message } = req.body;

  try {
    // const smsstatus = true;

    const smsstatus = await sendSms({
      message: message,
      numbers: numbers,
    });

    console.log(smsstatus);

    if (smsstatus) {
      const leads = await Lead.find({ email: { $in: emails } });
      // const lead = await Lead.find ({ email: mailid });

      console.log(leads);
      await Lead.updateMany(
        { email: { $in: emails } },
        {
          $push: { reviews: { comment: "Sms Sent", status: "level 2" } },
          $set: { status: "level 2" },
        },

        { multi: true }
      );
    }
  } catch (err) {
    console.log(err);
  }

  res.status(200);
  res.send({
    data: `Sms sent`,
  });
});

// @desc    Get report
// @route   GET /api/users/report
// @access  Private/Admin
exports.getReport = asyncHandler(async (req, res) => {
  let usersEmails = await User.find({ isAdmin: false }, "email _id username");
  let reportData = [];
  let temp_leadsByUsersStatus = [];
  let temp_leadsCountByUsers = [];

  let date1 = "12/01/2021"; //12 January 2021
  let date2 = "20/01/2021"; //12 January 2021
  let start_date = moment(date1, "DD.MM.YYYY").toISOString();
  let end_date = moment(date2, "DD.MM.YYYY").toISOString();
  console.log(start_date); //result is 2016-01-11T23:00:00.000Z
  console.log(end_date); //result is 2016-01-11T23:00:00.000Z

  // const start_date = '2021-09-18T21:07:42.313+00:00'
  // const end_date = '2021-09-18T21:07:42.313+00:00'

  // Total Leads Count
  let totalLeadsCount = await Lead.countDocuments();

  // leads Count By Level
  const levelCounts = await Lead.aggregate([
    { $match: { flag: "Active" } },
    {
      $group: {
        _id: { status: "$status" },
        data: { $sum: 1 },
      },
    },
    {
      $project: {
        status: "$_id.status",
        count: "$data",
      },
    },
  ]);

  // // leads Count By Level
  // const levelCounts = await Lead.aggregate([
  //   {
  //     $match: {
  //       $and: [
  //         { flag: "Active" },
  //         {
  //           $or: [
  //             {
  //               level_4_date: {
  //                 $gt: ISODate("Date here"),
  //                 $lt: ISODate("Date here"),
  //               },
  //             },
  //             {
  //               level_3_date: {
  //                 $gt: ISODate("Date here"),
  //                 $lt: ISODate("Date here"),
  //               },
  //             },
  //             {
  //               level_2_date: {
  //                 $gt: ISODate("Date here"),
  //                 $lt: ISODate("Date here"),
  //               },
  //             },
  //             {
  //               level_1_date: {
  //                 $gt: ISODate("Date here"),
  //                 $lt: ISODate("Date here"),
  //               },
  //             },
  //             {
  //               createdAt: {
  //                 $gt: ISODate("Date here"),
  //                 $lt: ISODate("Date here"),
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   },

  //   {
  //     $group: {
  //       _id: { status: "$status" },
  //       data: { $sum: 1 },
  //     },
  //   },
  //   {
  //     $project: {
  //       status: "$_id.status",
  //       count: "$data",
  //     },
  //   },
  // ]);

  // leadsByUsersStatus

  const levelCountsByUsers = await Lead.aggregate([
    { $match: { flag: "Active" } },
    {
      $group: {
        _id: { userId: "$user", status: "$status" },
        data: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: "$_id.userId",
        status: "$_id.status",
        count: "$data",
      },
    },
  ]);

  // leads Count By Users
  const totalAssigned = await Lead.aggregate([
    { $match: { flag: "Active" } },
    {
      $group: {
        _id: { userId: "$user" },
        total: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: "$_id.userId",
        totalAssigned: "$total",
      },
    },
  ]);

  // leads Count By Entrance Exam
  const entranceexamCounts = await Lead.aggregate([
    { $match: { flag: "Active" } },
    {
      $group: {
        _id: { entrance: "$entrance" },
        data: { $sum: 1 },
      },
    },
    {
      $project: {
        entrance: "$_id.entrance",
        count: "$data",
      },
    },
  ]);

  // leads Count By Source
  const SourceCounts = await Lead.aggregate([
    { $match: { flag: "Active" } },
    {
      $group: {
        _id: { source: "$source" },
        data: { $sum: 1 },
      },
    },
    {
      $project: {
        source: "$_id.source",
        count: "$data",
      },
    },
  ]);

  // Data cleaning and formatting

  for (let i = 0; i < usersEmails.length; i++) {
    let tempid = usersEmails[i]._id.toString();
    var obj1 = {
      username: usersEmails[i].username,
    };
    var obj2 = {
      username: usersEmails[i].username,
    };
    levelCountsByUsers.forEach((data) => {
      if (data._id == tempid) {
        obj1[data.status] = data.count;
      }
    });

    totalAssigned.forEach((data) => {
      if (data._id == tempid) {
        obj2["TotalAssigned"] = data.totalAssigned;
      }
    });
    temp_leadsByUsersStatus.push(obj1);
    temp_leadsCountByUsers.push(obj2);
  }

  const leadsByUsersStatus =
    temp_leadsByUsersStatus &&
    temp_leadsByUsersStatus.map((user) => ({
      Name: user.username,
      Level_0: user["level 0"] ? user["level 0"] : 0,
      Level_1: user["level 1"] ? user["level 1"] : 0,
      Level_2: user["level 2"] ? user["level 2"] : 0,
      Level_3: user["level 3"] ? user["level 3"] : 0,
      Level_4: user["level 4"] ? user["level 4"] : 0,
    }));

  // Leads Assigned Count by user
  const leadsCountByUsers =
    temp_leadsCountByUsers &&
    temp_leadsCountByUsers.map((user) => ({
      Name: user.username,
      Total_Leads_Assigned: user.TotalAssigned,
    }));

  // Leads  Count by level
  const leadsCountByLevel =
    levelCounts &&
    levelCounts.map((data) => ({
      Level: data.status,
      Leads_Count: data.count,
    }));

  // Leads  Count by entrance exam
  const leadsCountByEntrance =
    entranceexamCounts &&
    entranceexamCounts.map((data) => ({
      Entrance_Exam: data.entrance === "" ? "None" : data.entrance,
      Leads_Count: data.count,
    }));

  // Leads  Count by entrance exam
  const leadsCountBySource =
    SourceCounts &&
    SourceCounts.map((data) => ({
      Source: data.source === "" ? "None" : data.source,
      Leads_Count: data.count,
    }));

  // Pushing data to final report

  reportData.push([{ Total_Leads_Count: totalLeadsCount }]);
  reportData.push(leadsCountByUsers);
  reportData.push(leadsByUsersStatus);
  reportData.push(leadsCountByLevel);
  reportData.push(leadsCountByEntrance);
  reportData.push(leadsCountBySource);

  res.json(reportData);
});
