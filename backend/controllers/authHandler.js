const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables!");
}
const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
const registerUser = async (name, email, password, role) => {
  email = email.toLowerCase(); // Normalize email
  const existingUser = await User.findOne({ email });

  if (existingUser) throw new Error("User already exists. Please log in.");

  const newUser = new User({
    name,
    email,
    password, // Password will be hashed by pre-save hook
    role,
    phone: "", // Default empty string
    location: "",
    linkedin: "",
    github: "",
    leetcode: "",
    about: "",
    resume: "",   // Optional resume link
    website: "", // Optional website link
  });
  await newUser.save(); // ✅ Pre-save middleware in User model hashes the password
  return { msg: "User registered successfully" };
};

// Login user
const loginUser = async (email, password) => {
  email = email.toLowerCase(); // Normalize email
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  console.log("Password match:", isMatch);

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return { token, name: user.name, role: user.role };
};

module.exports = { registerUser, loginUser };
