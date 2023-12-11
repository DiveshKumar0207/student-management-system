const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
  },
  courseName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  courseFee: {
    type: String,
    required: true,
    trim: true,
  },
});

const course = mongoose.model("course", courseSchema);

module.exports = course;
