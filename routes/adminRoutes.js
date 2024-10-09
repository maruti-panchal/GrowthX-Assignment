const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  viewAssignments,
  updateAssignmentStatus,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/assignments", protect, viewAssignments);
router.post("/assignments/:id/accept", protect, (req, res) =>
  updateAssignmentStatus(req, res, "accepted")
);
router.post("/assignments/:id/reject", protect, (req, res) =>
  updateAssignmentStatus(req, res, "rejected")
);

module.exports = router;
