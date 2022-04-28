const mongoose = require("mongoose");

// const res = require("express/lib/response");

var schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name Required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name Required"],
  },
  email: {
    type: String,
    required: [true, "E-mail Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password Required"],
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  age: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, "Phone Number Required"],
    unique: true,
  },
  adhaar: {
    type: String,
    required: [true, "Adhaar Number Required"],
    unique: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others", ""],
      message: "{VALUE} is not supported",
    },
  },
  maritialStatus: {
    type: String,
    enum: {
      values: [
        "single",
        "married",
        "widowed",
        "divorced",
        "married but separated",
        "",
      ],
      message: "{VALUE} is not supported",
    },
  },
  userType: {
    type: String,
    enum: {
      values: ["user", "admin"],
      message: "{VALUE} is not supported",
    },
    default: "user",
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },
  ],
});

const Userdb = mongoose.model("user", schema);

module.exports = Userdb;
