const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  pincode: {
    type: String,
    trim: true,
  },
});

const address = mongoose.model("address", addressSchema);

module.exports = address;
