const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Received Authorization Header:", authHeader); // Debugging

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  console.log("Extracted Token:", token); // Debugging

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error.message); // Debugging
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
