const mongoose = require("mongoose");
// const course = require("./courseSchema");

const attendanceSchema = new mongoose.Schema({
  batch: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  attendancedate: {
    type: String,
  },
  attendance: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
      },
      rollno: {
        type: Number,
        required: true,
        trim: true,
      },
      attend: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

attendanceSchema.pre("save", function (next) {
  if (!this.attendancedate) {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    let date = d.getDate();
    date < 10 ? `0${date}` : date;
    const defaultDate = `${year}-${month}-${date}`;
    this.attendancedate = defaultDate;
  }
  next();
});

// compount-index --> so that attendance can be done once a day of a batch
attendanceSchema.index({ batch: 1, attendancedate: 1 }, { unique: true });

const attendance = mongoose.model("studentattendance", attendanceSchema);

module.exports = attendance;
