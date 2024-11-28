const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Address = require("./addressSchema");

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
  gender: {
    type: String,
    required: true,
  },
  teacherid: {
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
    lowercase: true,
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

  address: Address.schema,

  teachingcourse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  salary: {
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

  role: {
    type: String,
    default: "teacher",
  },
  refreshtokens: [String],
});

// middleware for teacher schema

teacherSchema.pre("save", async function (next) {
  const saltRounds = 11;

  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
      throw new Error("hash failed !");
    }
  }

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

const teacherRegister = mongoose.model("teacherregister", teacherSchema);

module.exports = { teacherRegister };
