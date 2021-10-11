const User = require("../models/userModel");
const Lead = require("../models/lead");
const asyncHandler = require("express-async-handler");
const {
  sendEmail,
  resetPasswordMail,
  firstMailToLead,
} = require("../utils/sendEmail");
const crypto = require("crypto");

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

    // HTML Message
    const resetPassMail = resetPasswordMail(user.username, resetUrl);

    try {
      // await sendEmail({
      //   to: user.email,
      //   subject: "Password Reset Request",
      //   text: resetPassMail,
      // });
      console.log(resetPassMail);

      res.status(200);
      res.json({ success: true, data: "Email Sent" });
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
// @route   GET /api/users
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
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
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
  const { emails } = req.body;

  const failedMails = [];
  let counter = 0;

  emails.map(async (mailid) => {
    const lead = await Lead.findOne({ email: mailid });
    if (lead) {
      const firstMail = firstMailToLead(lead.applicantName);
      try {
        // await sendEmail({
        //   to: lead.email,
        //   subject: "Visit IMDR",
        //   text: mail,
        // });
        console.log(firstMail);
        if (lead.status == "0") {
          lead.status = "1";
          const review = {
            name: req.user.username,
            status: "1",
            comment: "First contact to lead email sent",
            user: req.user._id,
          };

          lead.reviews.push(review);
        }

        lead.save();
        counter++;
      } catch (err) {
        failedMails.push(mailid);
      }
    }
  });

  res.status(200);
  res.json({ failed: failedMails, data: `${counter} Emails sent` });
});

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};
