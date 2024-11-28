const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const courseModel = require("../db/models/courseSchema"); // Adjust the path to your course model

// Ensure generateCourseID is defined
const generateCourseID = (index) => {
  return `COURSE-${String(index).padStart(3, "0")}`;
};

const generateCourse = (index) => {
  return {
    courseID: generateCourseID(index),
    courseName: faker.commerce.productName().toLowerCase().replace(/\s+/g, "-"),
    courseFee: faker.commerce.price({
      min: 5000,
      max: 20000,
      dec: 0,
      //   symbol: "Rs ",
    }),
  };
};

// Function to generate and save multiple courses
const generateCourses = async (courseCount) => {
  try {
    const courses = Array.from({ length: courseCount }, (_, index) =>
      generateCourse(index + 1)
    );

    // Save all courses to the database
    await courseModel.insertMany(courses);
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
    generateCourses(5);
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
