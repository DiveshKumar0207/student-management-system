const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  role: {
    type: String,
  },
  otp: {
    type: String,
  },
  expireAt: {
    type: Date,
    default: Date.now,
  },
});

otpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 300 });

const otp = new mongoose.model("otp", otpSchema);

module.exports = otp;
