const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const { studentRegister } = require("../db/models/studentSchema"); // Update with your actual path
const courseModel = require("../db/models/courseSchema");
const feeModel = require("../db/models/feeSchema");

// Function to generate a single student
const generateStudent = (courses) => {
  const firstname = faker.person.firstName().toUpperCase();
  const lastname = faker.person.lastName().toUpperCase();
  const gender = faker.helpers.arrayElement(["male", "female"]);
  const rollno = faker.number.int({ min: 1000, max: 9999 });
  const telephone = faker.phone.number("###-###-####").replace(/\D/g, ""); // 10-digit mobile number
  const email = faker.internet.email(firstname, lastname).toLowerCase();
  const password = faker.internet.password(10); // Random 10-character password
  const street = faker.location.streetAddress();
  const city = faker.location.city();
  const state = faker.location.state();
  const pincode = faker.location.zipCode("#####");
  const dob = faker.date
    .past(20, new Date(2003, 0, 1))
    .toISOString()
    .split("T")[0]; // Date of birth
  const joiningdate = new Date().toISOString().split("T")[0]; // Today's date
  const course = courses._id; // Replace with actual course ID
  const dueDate = faker.date.future().toISOString().split("T")[0];

  return {
    firstname,
    lastname,
    gender,
    rollno,
    telephone,
    email,
    password,
    address: { street, city, state, pincode },
    dob,
    joiningdate,
    course,
    dueDate,
  };
};

// Generate multiple students
const generateStudents = async (count) => {
  try {
    // Fetch courses from the database
    const courses = await courseModel.find({});
    if (!courses.length) {
      console.error("No courses found in the database!");
      return;
    }

    // Generate students using the available courses
    const students = Array.from({ length: count }, () => {
      const randomCourse = courses[Math.floor(Math.random() * courses.length)];
      return generateStudent(randomCourse);
    });

    // const students = Array.from({ length: count }, generateStudent);

    // Save students to the database
    const savedStudents = await studentRegister.insertMany(students);

    // For each student, add a fee record
    for (const student of savedStudents) {
      const fee = new feeModel({
        student: student._id, // Referencing the student
        amount: faker.number.int({ min: 1000, max: 5000 }), // Random fee amount
        course: student.course, // Referencing the course
        dueDate: student.dueDate, // Due date from student data
      });
      await fee.save();
    }

    console.log(`${count} students added successfully!`);
  } catch (error) {
    console.error("Error adding students:", error);
  }
};

// Connect to MongoDB and add dummy data
mongoose
  .connect("mongodb://localhost:27017/institutemanagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
    return generateStudents(10); // Add 10 students
  })
  .then(() => mongoose.disconnect())
  .catch(console.error);
