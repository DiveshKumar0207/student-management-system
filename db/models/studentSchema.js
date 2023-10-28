const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const Address = require("./addressSchema");

// const jwt = require("jsonwebtoken");
// require("dotenv").config();

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
  gender: {
    type: String,
    required: true,
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

  course: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
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
  role: {
    type: String,
    default: "student",
  },
  refreshtokens: [String],
});

// middleware to generate jwt token
// studentSchema.methods.generateAuthToken = async function () {
//   try {
//     const jwtToken = jwt.sign({ _id: this._id.toString() }, process.env.PRIVATE_KEY);
//     // this.tokens = this.tokens.concat({ token: jwtToken });
//     console.log(jwtToken);
//     return jwtToken;
//   } catch (error) {
//     console.log(`jwt token error : ${error}`);
//     throw error;
//   }
// };

// middleware to hash password and default date
studentSchema.pre("save", async function (next) {
  const saltRounds = 11;

  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (error) {
      throw new error("hash failed !");
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

const studentRegister = new mongoose.model("studentregister", studentSchema);

module.exports = { studentRegister };
