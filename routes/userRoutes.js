const express = require("express");
const {
  registerUser,
  loginUser,
  uploadAssignment,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { fetchAllAdmins } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/upload", protect, uploadAssignment);
router.get("/admins", protect, fetchAllAdmins);

module.exports = router;
