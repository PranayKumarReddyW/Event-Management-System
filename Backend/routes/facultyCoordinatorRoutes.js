const express = require("express");
const router = express.Router();
const facultyCoordinatorController = require("../controllers/facultyCoordinatorController"); // Adjust the path as needed

// Register a new faculty coordinator
router.post(
  "/faculty-coordinators/register",
  facultyCoordinatorController.register
);

// Update an existing faculty coordinator by ID
router.put(
  "/faculty-coordinators/update/:id",
  facultyCoordinatorController.update
);

// Delete a faculty coordinator by ID
router.delete(
  "/faculty-coordinators/delete/:id",
  facultyCoordinatorController.delete
);

router.get(
  "/faculty-coordinators",
  facultyCoordinatorController.getFacultyCoordinators
);

// Export the router
module.exports = router;
