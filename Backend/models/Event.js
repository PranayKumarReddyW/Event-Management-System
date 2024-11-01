const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > Date.now();
      },
      message: "Event date must be in the future",
    },
  },
  venue: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  studentCoordinators: {
    type: [Schema.Types.ObjectId],
    ref: "StudentCoordinator",
    default: [],
  },
  facultyCoordinators: {
    type: [Schema.Types.ObjectId],
    ref: "FacultyCoordinator",
    default: [],
  },
});

module.exports = model("Event", eventSchema);
