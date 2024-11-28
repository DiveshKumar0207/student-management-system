const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");


const adminSchema = new mongoose.Schema({
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

  role: {
    type: String,
    default: "admin",
  },

});

// middleware for admin schema

adminSchema.pre("save", async function (next) {
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

const adminRegister = mongoose.model("adminregister", adminSchema);

module.exports = { adminRegister };
