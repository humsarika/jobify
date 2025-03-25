const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Job Seeker", "Recruiter"], required: true },
  linkedin: { type: String, default: "" },
  github: { type: String, default: "" },
  leetcode: { type: String, default: "" },
  phone: { type: String, default: "" },
  resume: { type: String, default: "" },  // ✅ Resume File URL
  website: { type: String, default: "" }, // ✅ Personal Website URL
  location: { type: String, default: "" },
  about: { type: String, default: "" },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
