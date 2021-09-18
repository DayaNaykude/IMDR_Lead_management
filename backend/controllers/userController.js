const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// @desc  Auth user & get token
// @route  POST /api/users/login
// @access  Public
// exports.loginUser = asyncHandler(async (req, res, next) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      user,
    });
    // sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
    next(error);
  }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    return next(new Error("Please provide email and password"));
  }

  try {
    // Check that user exists by email
    // const user = await User.findOne({ email });
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401);
      return next(new Error("User does not exists !"));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      res.status(401);
      return next(new Error("Invalid credentials !"));
    }

    res.status(200).json({
      success: true,
      token: "adfahgafadasf243",
    });
  } catch (error) {
    res.status(500);
    return next(new Error(error.message));
    // next(error);
  }
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  res.send("Forgot Password Route");
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  res.send("Reset Password Route");
});
