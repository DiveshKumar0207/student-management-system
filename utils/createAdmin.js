const mongoose = require("mongoose");
const { adminRegister } = require("../db/models/adminSchema"); // Adjust the path to your course model

const adminData = {
  firstname: "XYZ",
  lastname: "MNOP",

  email: "admin123@gmail.com",
  password: "admin@123",
};

// Function to generate and save multiple courses
const generateAdmin = async () => {
  try {
    // Save all courses to the database
    await adminRegister.create(adminData);
    console.log("Dummy courses added successfully!");
  } catch (error) {
    console.error("Error adding courses:", error);
  } finally {
    mongoose.connection.close(); // Close the database connection after completion
  }
};

// Connect to the database and execute the script
mongoose
  .connect("mongodb://localhost:27017/institutemanagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
    generateAdmin();
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
