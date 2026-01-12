const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Art = require("../models/Art");

/* ---------- MULTER CONFIG ---------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ---------- ROUTES ---------- */

// GET all arts
router.get("/", async (req, res) => {
  try {
    const arts = await Art.find().sort({ createdAt: -1 });
    res.json(arts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new art (image upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, author } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const newArt = new Art({
      title,
      author,
      imageURL: `/uploads/${req.file.filename}`,
    });

    await newArt.save();
    res.status(201).json(newArt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- EXPORT ROUTER ---------- */
module.exports = router;
