  const { Schema, model } = require("mongoose");

  const studentCoordinatorSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
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

  module.exports = model("StudentCoordinator", studentCoordinatorSchema);
