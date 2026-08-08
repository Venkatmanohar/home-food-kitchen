require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const db = require("./config/db");

const adminRoutes = require("./routes/adminRoutes");
const foodRoutes = require("./routes/foodRoutes");

const app = express();


// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());


// Rate Limit
const limiter = rateLimit({
   windowMs: 15 * 60 * 1000,
    limit: 100,
});

app.use(limiter);


// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/foods", foodRoutes);


// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Home Food Backend Running 🚀"
    });
});


// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server Running: http://localhost:${PORT}`);
});