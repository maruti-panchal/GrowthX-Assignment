const User = require("../models/User");
const Assignment = require("../models/Assignment");
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomErrorClass");

// Register a new user
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
});

// User login
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return next(new CustomError("Invalid credentials", 400));
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  const cookieOption = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  };
  res.cookie("user_token", token, cookieOption);
  res.json({ token });
});

// Upload an assignment
exports.uploadAssignment = asyncErrorHandler(async (req, res, next) => {
  const { task, admin } = req.body;
  const adminUser = await User.findOne({ email: admin, role: "admin" });
  if (!adminUser) {
    return next(new CustomError("Admin not found", 400));
  }
  const assignment = new Assignment({
    userId: req.user.id,
    task,
    adminId: adminUser._id,
  });
  await assignment.save();
  res.status(201).json({ message: "Assignment uploaded successfully" });
});

exports.fetchAllAdmins = async (req, res, next) => {
  const admins = await User.find({ role: "admin" }).select("_id email name");
  if (!admins.length) {
    return next(new CustomError("No admins found", 404));
  }
  res.status(200).json(admins);
};
