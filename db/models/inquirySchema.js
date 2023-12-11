const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  telephone: {
    required: true,
    type: String,
  },

  address: {
    required: true,
    type: String,
  },
  message: {
    required: true,
    type: String,
  },
  status: {
    type: String,
    enums: ["Pending", "Resolved"],
    default: "Pending",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const inquiryModel = mongoose.model("inquiry", inquirySchema);

module.exports = inquiryModel;
