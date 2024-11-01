const FacultyCoordinator = require("../models/facultyCoordinator");

exports.register = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const isMailPresent = await FacultyCoordinator.findOne({ email });
    if (isMailPresent) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }
    const user = await FacultyCoordinator.create({
      name,
      phone,
      email,
    });
    return res.json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    // Check if the email already exists and belongs to another user
    const emailExists = await FacultyCoordinator.findOne({ email });
    if (emailExists && emailExists._id.toString() !== id) {
      return res.json({
        success: false,
        message: "Email already in use by another user",
      });
    }

    // Update the user's information
    const user = await FacultyCoordinator.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );

    // Check if the user exists
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Send success response
    return res.json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    // Handle errors and send error response
    return res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    // Find and delete the faculty coordinator by ID
    const user = await FacultyCoordinator.findByIdAndDelete(id);

    // Check if the faculty coordinator exists
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Remove the faculty coordinator from associated events
    await Event.updateMany(
      { facultyCoordinators: id }, // Assuming 'facultyCoordinators' is the field that holds references to faculty coordinators
      { $pull: { facultyCoordinators: id } }
    );

    // Send success response
    return res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    // Handle errors and send error response
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};

exports.getFacultyCoordinators = async (req, res) => {
  try {
    const facultyCoordinators = await FacultyCoordinator.find().populate(
      "events"
    );
    if (facultyCoordinators.length > 0) {
      return res.json({
        success: true,
        facultyCoordinators,
      });
    }
    return res.json({
      success: true,
      facultyCoordinators: [],
      message: "No faculty coordinators found",
    });
  } catch (error) {
    console.error("Error fetching faculty coordinators:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching faculty coordinators",
    });
  }
};
