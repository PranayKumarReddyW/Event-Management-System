  const { model, Schema, default: mongoose } = require("mongoose");

  const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
    branch: {
      type: String,
      required: true,
      enum: [
        "CSE",
        "CSE DS",
        "CSE BS",
        "EEE",
        "CIVIL",
        "MECH",
        "ECE",
        "MBA",
        "MCA",
        "AIML",
        "CYBER SECURITY",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    section: {
      type: String,
      required: true,
      enum: ["A", "B", "C", "D", "E", "F"],
    },
    role: {
      type: String,
      default: "Student",
      enum: ["Student", "Admin"],
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    eventsRegistered: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
      default: [],
    },
  });

  module.exports = model("User", userSchema);
