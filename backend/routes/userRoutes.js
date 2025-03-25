
const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware'); // Import your middleware
const userController = require('../controllers/userController'); // Your controller




router.get('/profile', authenticateJWT, userController.getUserProfile); // Get Profile
// router.put('/profile', authenticateJWT, updateUserProfile); // Update Profile


module.exports = router;