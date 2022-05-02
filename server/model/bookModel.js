const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Book name Required"],
  },
  authorName: {
    type: String,
  },
  publisher: {
    type: String,
  },
  publishYear: {
    type: String,
  },
  price: {
    type: String,
  },
  pages: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookcategory",
  },
});

const Booksdb = mongoose.model("books", schema);

module.exports = Booksdb;
