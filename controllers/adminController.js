const User = require("../models/User");
const Assignment = require("../models/Assignment");
const jwt = require("jsonwebtoken");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/CustomErrorClass");
// Register a new admin
exports.registerAdmin = asyncErrorHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const admin = new User({ name, email, password, role: "admin" });
  await admin.save();
  res.status(201).json({ message: "Admin registered successfully" });
});

// Admin login
exports.loginAdmin = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email });
  if (!admin || !(await admin.matchPassword(password))) {
    return next(new CustomError("Invalid credentials", 400));
  }
  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  const cookieOption = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  };
  res.cookie("admin_token", token, cookieOption);
  res.json({ token });
});

// View assignments for the admin
exports.viewAssignments = asyncErrorHandler(async (req, res) => {
  const assignments = await Assignment.find({
    adminId: req.user.id,
  }).populate("userId", "name");
  res.json(assignments);
});

// Accept or reject an assignment
exports.updateAssignmentStatus = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["pending", "accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  const assignment = await Assignment.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true }
  );
  if (!assignment) {
    return next(new CustomError("Assignment not found", 404));
  }
  res.status(200).json({
    message: `Assignment ${status}`,
    assignment,
  });
});
