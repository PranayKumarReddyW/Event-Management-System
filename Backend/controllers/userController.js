const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const {
    name,
    year,
    branch,
    email,
    password,
    registrationNumber,
    section,
    phoneNumber,
  } = req.body;
  console.log(req.body);

  if (
    !name ||
    !year ||
    !branch ||
    !email ||
    !password ||
    !registrationNumber ||
    !section ||
    !phoneNumber
  ) {
    return res.json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    // Check if email id or regdno already exists
    const isMailPresent = await User.findOne({ email });
    const isRegdNoPresent = await User.findOne({ registrationNumber });
    if (isMailPresent || isRegdNoPresent) {
      return res.json({
        success: false,
        message: "Email or Registration Number already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      name,
      year,
      branch,
      email,
      password: hashedPassword,
      registrationNumber,
      section,
      phoneNumber,
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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Compare entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration time
    );

    // Send response with token
    return res.json({
      success: true,
      message: "Login successful",
      token, // Send the token in the response
      user: {
        id: user._id,
        role: user.role,
        email: user.email, // You can choose which user details to include
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const users = await User.find({}).populate("eventsRegistered");

    // Check if users exist
    if (users.length > 0) {
      users.forEach((user) => {
        user.password = undefined; // Don't send password in response
      });
      return res.json({
        success: true,
        data: users,
      });
    } else {
      return res.json({
        success: true,
        data: [], // Return an empty array if no users found
        message: "There are no users registered",
      });
    }
  } catch (error) {
    console.error("Error fetching users data:", error); // Log the error
    return res.status(500).json({
      success: false,
      message: "Error in fetching users data",
    });
  }
};

exports.updateUser = async (req, res) => {
  const {
    name,
    year,
    branch,
    email,
    registrationNumber,
    section,
    phoneNumber,
  } = req.body;

  const { id } = req.params;

  try {
    // Check if the email is already in use by another user
    const emailExists = await User.findOne({ email, _id: { $ne: id } });
    if (emailExists) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }
    const regdNoExists = await User.findOne({
      registrationNumber,
      _id: { $ne: id },
    });
    if (regdNoExists) {
      return res.json({
        success: false,
        message: "Registration Number already exists",
      });
    }

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        year,
        branch,
        email,
        registrationNumber,
        section,
        phoneNumber,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
