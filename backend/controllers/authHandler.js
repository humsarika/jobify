const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();


if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables!");
}
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Register a new user
const registerUser = async (name, email, password, role) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists. Please Log in.");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();
  return { msg: "User registered successfully" };
};

// ✅ Login user
const loginUser = async (email, password) => {
  email = email.toLowerCase(); // Convert email to lowercase
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");


  const isMatch = await bcrypt.compare(password, user.password);
  
 

  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
  return { token, name: user.name, role: user.role };
};

module.exports = { registerUser, loginUser };
