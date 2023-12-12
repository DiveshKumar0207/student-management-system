const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentregister",
    required: true,
  },
  amount: {
    type: Number,
    trim: true,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  dueDate: {
    type: Date,
  },
  paymentstatus: {
    type: String,
    enums: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const fee = mongoose.model("studentfee", feeSchema);

module.exports = fee;
