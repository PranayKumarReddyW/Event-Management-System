const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController"); // Adjust the path as needed

// Create a new event
router.post("/events/create", eventController.create);

// Update an existing event by ID
router.put("/events/update/:id", eventController.update);

// Delete an event by ID
router.delete("/events/delete/:id", eventController.delete);

router.get("/events", eventController.getEvents);
// Export the router
module.exports = router;
