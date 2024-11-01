  const express = require("express");
  const router = express.Router();
  const studentCoordinatorController = require("../controllers/studentCoordinatorController"); // Adjust the path as needed

  // Register a new student coordinator
  router.post(
    "/student-coordinators/register",
    studentCoordinatorController.register
  );

  // Update an existing student coordinator by ID
  router.put(
    "/student-coordinators/update/:id",
    studentCoordinatorController.update
  );

  // Delete a student coordinator by ID
  router.delete(
    "/student-coordinators/delete/:id",
    studentCoordinatorController.delete
  );

  router.get(
    "/student-coordinators",
    studentCoordinatorController.getStudentCoordinators
  );

  // Export the router
  module.exports = router;
