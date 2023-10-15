const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// studentschema
const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  rollno: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  telephone: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
    min: [10, "Must be at least 10, got {VALUE}"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("Invalid Email !");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: [8, "Must be at least 8, got {VALUE}"],
  },

  location: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },

  joiningdate: {
    type: String,
  },
  dob: {
    type: String,
    required: true,
  },
  profilepic: {
    contentType: String,
    data: Buffer,
  },
});

const teacherSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("Invalid Email !");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: [8, "Must be at least 8, got {VALUE}"],
  },
  telephone: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
    min: [10, "Must be at least 10, got {VALUE}"],
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  rollno: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },

  joiningdate: {
    type: String,
  },
  dob: {
    type: String,
    required: true,
  },
});

// Middleware to format joiningdate if not provided
studentSchema.pre("save", function (next) {
  if (!this.joiningdate) {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    let date = d.getDate();
    date < 10 ? `0${date}` : date;
    const defaultDate = `${year}-${month}-${date}`;
    this.joiningdate = defaultDate;
  }
  next();
});

// middleware to hash password
studentSchema.pre("save", async function (next) {
  const saltRounds = 11;

  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
      throw new error("hash failed !");
    }
  }

  next();
});

const studentRegister = new mongoose.model("studentregister", studentSchema);
const teacherRegister = new mongoose.model("teacherregister", teacherSchema);

module.exports = { studentRegister, teacherRegister };
