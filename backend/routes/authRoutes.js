const express = require("express");
const { check, validationResult } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/authHandler");

const router = express.Router();

//  New user registration route
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("role", "Role is required").isIn(["Job Seeker", "Recruiter"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;
    console.log("User registration begins...");

    try {
      let response = await registerUser(name, email, password, role); // ✅ Register user using authHandler
      console.log("🔹 User registered successfully", email);
      return res.status(201).json(response); 
    } catch (err) {
      console.error(" Registration Error: ", err.message);
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

// ✅ Login route
router.post("/login", async (req, res) => {
  try {
    let response = await loginUser(req.body.email, req.body.password);
    console.log("🔹 User logged in successfully", req.body.email);
    return res.status(200).json(response); 
  } catch (err) {
    console.error("Login Error: ", err.message);
    return res.status(400).json({ msg: err.message }); 
  }
});

module.exports = router;
