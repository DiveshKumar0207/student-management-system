const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
    required: true,
  },
  state: {
    type: String,
    trim: true,
    required: true,
  },
  pincode: {
    type: String,
    trim: true,
    required: true,
  },
});

const address = mongoose.model("address", addressSchema);

module.exports = address;
