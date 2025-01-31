const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  startData: {
    type: Date,
    default: Date.now(),
  },
  endData: {
    type: Date,
  },
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  isbn: {
    type: String,
    unique: true,
  },
  category: {
    type: String,
  },
  publishedYear: {
    type: Number,
  },
  rentPrice: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  loan: [loanSchema],
  isOnLease: {
    type: Boolean,
    default: false,
  },
});

bookSchema.plugin(timestamps);
loanSchema.plugin(timestamps);

bookSchema.pre("find", function (next) {
  this.where({ isDeleted: false });
  next();
});

const BookSchema = mongoose.model("Book", bookSchema);
const LoanSchema = mongoose.model("Loan", loanSchema);
module.exports = { BookSchema, LoanSchema };
