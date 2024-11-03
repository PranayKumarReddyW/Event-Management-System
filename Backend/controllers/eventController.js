const Event = require("../models/Event");
const StudentCoordinator = require("../models/StudentCoordinator");
const FacultyCoordinator = require("../models/FacultyCoordinator");

exports.create = async (req, res) => {
  const {
    title,
    description,
    date,
    venue,
    cost,
    studentCoordinators,
    facultyCoordinators,
  } = req.body;

  try {
    // Check if an event with the same title already exists
    const eventExists = await Event.findOne({ title });
    if (eventExists) {
      return res.json({
        success: false,
        message: "Event with this title already exists",
      });
    }

    // Check if all the student coordinators exist
    const studentCoordinatorsExist = await StudentCoordinator.find({
      _id: { $in: studentCoordinators },
    });

    // If some IDs are missing, return an error response
    if (studentCoordinatorsExist.length !== studentCoordinators.length) {
      return res.json({
        success: false,
        message: "One or more student coordinators do not exist",
      });
    }

    // Check if all the faculty coordinators exist
    const facultyCoordinatorsExist = await FacultyCoordinator.find({
      _id: { $in: facultyCoordinators },
    });

    // If some IDs are missing, return an error response
    if (facultyCoordinatorsExist.length !== facultyCoordinators.length) {
      return res.json({
        success: false,
        message: "One or more faculty coordinators do not exist",
      });
    }

    // Create a new event
    const newEvent = new Event({
      title,
      description,
      date,
      venue,
      cost,
      studentCoordinators,
      facultyCoordinators,
    });

    // Save the event to the database
    await newEvent.save();

    // Insert the event ID into each student and faculty coordinator's record
    await StudentCoordinator.updateMany(
      { _id: { $in: studentCoordinators } },
      { $push: { events: newEvent._id } } // Push the event ID to the events array
    );

    await FacultyCoordinator.updateMany(
      { _id: { $in: facultyCoordinators } },
      { $push: { events: newEvent._id } } // Push the event ID to the events array
    );

    // Send success response
    return res.json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    // Handle errors and send error response
    return res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    cost,
    venue,
    date,
    description,
    studentCoordinators,
    facultyCoordinators,
  } = req.body;

  try {
    // Check if the event title is already in use by another event
    const eventWithTitle = await Event.findOne({ title });
    if (eventWithTitle && eventWithTitle._id.toString() !== id) {
      return res.json({
        success: false,
        message: "Event with this title already exists",
      });
    }

    // Find and update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        cost,
        venue,
        date,
        description,
        studentCoordinators,
        facultyCoordinators,
      },
      { new: true } // Return the updated document
    );

    // Check if the event exists
    if (!updatedEvent) {
      return res.json({
        success: false,
        message: "Event not found",
      });
    }

    // Update the events array for student coordinators
    await StudentCoordinator.updateMany(
      { _id: { $in: studentCoordinators } },
      { $addToSet: { events: updatedEvent._id } } // Add the event ID
    );

    // Update the events array for faculty coordinators
    await FacultyCoordinator.updateMany(
      { _id: { $in: facultyCoordinators } },
      { $addToSet: { events: updatedEvent._id } } // Add the event ID
    );

    // Send success response
    return res.json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    // Handle errors and send error response
    return res.status(500).json({
      success: false,
      message: "Error updating event",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the event by ID
    const event = await Event.findByIdAndDelete(id);

    // Check if the event exists
    if (!event) {
      return res.json({
        success: false,
        message: "Event not found",
      });
    }

    // Remove the event ID from student coordinators
    await StudentCoordinator.updateMany(
      { events: event._id },
      { $pull: { events: event._id } } // Remove the event ID
    );

    // Remove the event ID from faculty coordinators
    await FacultyCoordinator.updateMany(
      { events: event._id },
      { $pull: { events: event._id } } // Remove the event ID
    );

    // Send success response
    return res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    // Handle errors and send error response
    return res.status(500).json({
      success: false,
      message: "Error deleting event",
      error: error.message,
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    // Fetch events from the database and populate the coordinators
    const events = await Event.find().populate(
      "facultyCoordinators studentCoordinators"
    );

    // Check if events exist
    if (events.length > 0) {
      return res.json({
        success: true,
        data: events,
      });
    } else {
      return res.json({
        success: true,
        data: [], // Return an empty array if no events are found
        message: "No events found",
      });
    }
  } catch (error) {
    console.error("Error fetching events:", error); // Log the error
    return res.status(500).json({
      success: false,
      message: "Error in fetching events data",
    });
  }
};
