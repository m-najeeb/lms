const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    rentPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BookSchema = mongoose.model("Book", bookSchema);
module.exports = { BookSchema };
