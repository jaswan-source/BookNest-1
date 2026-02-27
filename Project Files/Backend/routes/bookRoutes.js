const express = require("express");
const Book = require("../models/book.js");
const multer = require("multer");
const path = require("path");

const router = express.Router();

/* ===============================
   MULTER STORAGE CONFIG
================================= */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // images folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

/* ===============================
   GET ALL BOOKS
================================= */

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ===============================
   ADD BOOK WITH IMAGE
================================= */

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, author, price, sellerId } = req.body;

    if (!title || !author || !price) {
      return res.status(400).json({ 
        message: "Title, author, and price are required" 
      });
    }

    const book = new Book({
      title,
      author,
      price,
      sellerId,
      image: req.file
        ? `/public/images/${req.file.filename}`
        : "",
    });

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* ===============================
   UPDATE BOOK
================================= */

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, author, price, sellerId } = req.body;
    const updateData = { title, author, price, sellerId };

    if (req.file) {
      updateData.image = `/public/images/${req.file.filename}`;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/* ===============================
   DELETE BOOK
================================= */

router.delete("/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
