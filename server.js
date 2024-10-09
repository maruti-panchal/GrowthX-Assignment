const express = require("express");
const dotenv = require("dotenv");
const rateLimiter = require("express-rate-limit");
const connectDB = require("./config/db");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

dotenv.config();
connectDB();

const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP,Please try again letter",
});

const app = express();


app.use(mongoSanitize());
app.use(xss());
app.use(helmet());
app.use("/api", limiter);
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
