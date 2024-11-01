const express = require("express");
const cors = require("cors");

const { dbConnect } = require("./config/database");

const app = express();

require("dotenv").config();
// Middlewares
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Replace with your frontend URL
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
// Database connection
dbConnect();

app.get("/", (req, res) => {
  res.send("This is the home page for Advitiya Backend");
});

// Import routes
const userRoutes = require("./routes/userRoutes");
const studentCoordinatorRoutes = require("./routes/studentCoordinatorRoutes");
const facultyCoordinatorRoutes = require("./routes/facultyCoordinatorRoutes");
const eventRoutes = require("./routes/eventRoutes");

// Use routes
app.use("/api", userRoutes);
app.use("/api", studentCoordinatorRoutes);
app.use("/api", facultyCoordinatorRoutes);
app.use("/api", eventRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
