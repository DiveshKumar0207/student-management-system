const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  noticehead: {
    type: String,
    trim: true,
  },
  notice: {
    type: String,
    trim: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
  },
});

//  TTL index to auto-expire notice //but we need custom deletion
// noticeSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const notice = mongoose.model("notice", noticeSchema);

module.exports = notice;
