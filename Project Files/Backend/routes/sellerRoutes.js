const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");

// ✅ GET ALL SELLERS
router.get("/", async (req, res) => {
  try {
    const sellers = await Seller.find().select("-password");
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sellers", error: error.message });
  }
});

// ✅ GET SELLER BY ID
router.get("/:id", async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id).select("-password");
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller", error: error.message });
  }
});

// ✅ REGISTER NEW SELLER
router.post("/register", async (req, res) => {
  try {
    const { businessName, email, password } = req.body;

    if (!businessName || !email || !password) {
      return res.status(400).json({ 
        message: "Business name, email, and password are required" 
      });
    }

    // Check if seller already exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(409).json({ message: "Seller with this email already exists" });
    }

    const newSeller = new Seller({ businessName, email, password });
    const savedSeller = await newSeller.save();

    res.status(201).json({
      message: "Seller registered successfully",
      seller: savedSeller
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// ✅ UPDATE SELLER
router.put("/:id", async (req, res) => {
  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.json(updatedSeller);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
});

// ✅ DELETE SELLER
router.delete("/:id", async (req, res) => {
  try {
    const deletedSeller = await Seller.findByIdAndDelete(req.params.id);
    if (!deletedSeller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    res.json({ message: "Seller deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error: error.message });
  }
});

module.exports = router;
