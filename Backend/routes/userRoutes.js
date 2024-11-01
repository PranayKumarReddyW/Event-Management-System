const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Adjust the path based on your directory structure

// User Registration
router.post("/register", userController.register);

// User Login
router.post("/login", userController.login);

// Get All Students
router.get("/students", userController.getStudents);

// Update User Information
router.put("/students/:id", userController.updateUser);

router.get("/students/:id", userController.getUserById);
// Export the router
module.exports = router;
