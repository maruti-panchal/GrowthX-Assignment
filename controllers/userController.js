const User = require("../models/User");
const Assignment = require("../models/Assignment");
const jwt = require("jsonwebtoken");

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Upload an assignment
exports.uploadAssignment = async (req, res) => {
  const { task, admin } = req.body;
  try {
    const adminUser = await User.findOne({ email: admin, role: "admin" });
    if (!adminUser) {
      return res.status(400).json({ message: "Admin not found" });
    }
    const assignment = new Assignment({
      userId: req.user.id,
      task,
      adminId: adminUser._id,
    });
    await assignment.save();
    res.status(201).json({ message: "Assignment uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
