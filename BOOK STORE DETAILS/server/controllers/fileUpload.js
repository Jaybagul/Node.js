const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save files with a unique name
  },
});

// Initialize Multer with the storage engine
const upload = multer({ storage: storage });

// Middleware to serve static files (optional, for testing the upload folder)
app.use("/uploads", express.static("uploads"));

// Route to handle single file upload
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.send(`File uploaded successfully: ${req.file.filename}`);
  } catch (err) {
    res.sendStatus(500);
  }
});
