const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
require("dotenv").config();


const router = express.Router();

if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables!");
  }
  const JWT_SECRET = process.env.JWT_SECRET;

// ✅ REGISTER
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    check("role", "Role is required").isIn(["Job Seeker", "Recruiter"])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role } = req.body;
    console.log("User registration begins...");
    try {
      let user = await User.findOne({ email });
      if (user) {
        console.log(user);
        return res.status(400).json({ msg: "User already exists. Please Log in." });
      }      
      user = new User({ name, email, password, role });
      await user.save();
      console.log("🔹 User registered successfully: ", name);
      res.status(201).json({ msg: "User registered successfully" });

    } catch (err) {
        console.error(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// ✅ LOGIN
router.post("/login", async (req, res) => {
    try {
      const email = req.body.email.toLowerCase(); // 👈 Convert to lowercase
      const { password } = req.body;
  
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("🔹 Password Match Status: ", isMatch);
      console.log("🔹 User logged in successfully", email);
  
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ token, name: user.name, role: user.role });
    } catch (err) {
      console.error("🔴 Error: ", err);
      res.status(500).json({ msg: "Server Error" });
    }
  });
  
  router.get("/test", async (req, res) => {
    const plainPassword = "123456";
    const hashed = await bcrypt.hash(plainPassword, 10);
    console.log("Hashed Password:", hashed);
  
    const isMatch = await bcrypt.compare("123456", hashed);
    console.log("Password Match:", isMatch);
  
    res.json({ hashed, isMatch });
  });
  
module.exports = router;
