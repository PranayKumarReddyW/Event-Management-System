  const { Schema, model } = require("mongoose");

  const facultyCoordinatorSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  });

  module.exports = model("FacultyCoordinator", facultyCoordinatorSchema);
