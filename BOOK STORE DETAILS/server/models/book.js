const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  description: String,
  isbn: String,
});

const BookModel = mongoose.model("BookStore", schema);
module.exports = BookModel;
