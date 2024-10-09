const User = require("../models/User");
const Assignment = require("../models/Assignment");
const jwt = require("jsonwebtoken");

// Register a new admin
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const admin = new User({ name, email, password, role: "admin" });
    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await User.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// View assignments for the admin
exports.viewAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({
      adminId: req.user.id,
    }).populate("userId", "name");
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Accept or reject an assignment
exports.updateAssignmentStatus = async (req, res) => {
  const { id } = req.params; // Extract assignment ID from URL params
  const { status } = req.body; // Get the status from request body

  try {
    // Validate status field
    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Find assignment by ID and update its status using the $set operator
    const assignment = await Assignment.findByIdAndUpdate(
      id,
      { $set: { status } }, // Use $set to only update the 'status' field
      { new: true } // Return the updated document
    );

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({
      message: `Assignment ${status}`,
      assignment, // Return the updated assignment object in the response
    });
  } catch (err) {
    // Handle any errors
    console.error(err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
