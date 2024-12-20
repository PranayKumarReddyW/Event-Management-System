const mongoose = require("mongoose");

exports.dbConnect = () => {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log("Error in connecting to the database:", error);
    });
};
