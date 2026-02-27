const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Import routes
const bookRoutes = require("./routes/bookRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const sellerRoutes = require("./routes/sellerRoutes.js");

// Import models
const Book = require("./models/book.js");
const Order = require("./models/Order.js");
const Seller = require("./models/Seller.js");

const app = express();

// ===============================
// ✅ ENVIRONMENT & PORT
// ===============================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

// ===============================
// ✅ MIDDLEWARE
// ===============================
app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// ✅ ENSURE IMAGE FOLDER EXISTS
// ===============================
const imagePath = path.join(__dirname, "public/images");
if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true });
}

app.use("/public", express.static(path.join(__dirname, "public")));

// ===============================
// ✅ MONGODB CONNECTION
// ===============================
if (!MONGO_URI) {
  console.error("ERROR: MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ===============================
// 📚 ROUTES
// ===============================

// Books routes
app.use("/api/books", bookRoutes);

// Orders routes
app.use("/api/orders", orderRoutes);

// Sellers routes
app.use("/api/sellers", sellerRoutes);

// ===============================
// ✅ HEALTH CHECK
// ===============================
app.get("/", (req, res) => {
  res.json({ 
    status: "Online",
    message: "BookNest API Server is running 🚀",
    version: "1.0.0"
  });
});

app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// ===============================
// ❌ 404 HANDLER
// ===============================
app.use((req, res) => {
  res.status(404).json({ 
    error: "Endpoint not found",
    path: req.path,
    method: req.method
  });
});

// ===============================
// 🚀 START SERVER
// ===============================
app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   GET  /api/books       - Get all books`);
  console.log(`   POST /api/books       - Add new book`);
  console.log(`   GET  /api/orders      - Get all orders`);
  console.log(`   POST /api/orders      - Create order`);
  console.log(`   GET  /api/sellers     - Get all sellers\n`);
});

module.exports = app;
