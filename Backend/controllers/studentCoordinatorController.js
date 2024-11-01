const StudentCoordinator = require("../models/StudentCoordinator");

exports.register = async (req, res) => {
  const { name, year, phone, email } = req.body;
  try {
    const isMailPresent = await StudentCoordinator.findOne({ email });
    if (isMailPresent) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }
    const user = await StudentCoordinator.create({
      name,
      year,
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
  const { name, email, phone, year } = req.body;

  try {
    // Check if the new email already exists in another user's record
    const emailExists = await StudentCoordinator.findOne({ email });
    if (emailExists && emailExists._id.toString() !== id) {
      return res.json({
        success: false,
        message: "Email already in use by another user",
      });
    }

    // Update the user's information
    const user = await StudentCoordinator.findByIdAndUpdate(
      id,
      { name, email, phone, year },
      { new: true }
    );

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Send a success response
    return res.json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
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
    // Find and delete the user by ID
    const user = await StudentCoordinator.findByIdAndDelete(id);

    // Check if the user exists
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Remove the student from events where they are referenced
    await Event.updateMany(
      { coordinators: id }, // Assuming 'coordinators' is the field that stores student IDs
      { $pull: { coordinators: id } } // Remove the student ID from the coordinators array
    );

    // Send success response
    return res.json({
      success: true,
      message: "User deleted successfully and removed from events",
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

exports.getStudentCoordinators = async (req, res) => {
  try {
    const studentCoordinators = await StudentCoordinator.find().populate(
      "events"
    );
    if (studentCoordinators.length > 0) {
      return res.json({
        success: true,
        studentCoordinators,
      });
    }
    return res.json({
      success: true,
      studentCoordinators: [],
      message: "No student coordinators found",
    });
  } catch (error) {
    console.error("Error fetching student coordinators:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching student coordinators",
    });
  }
};
