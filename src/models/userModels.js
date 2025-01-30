const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const { role } = require("../../api/enums/userEnums");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: Number,
    enum: [role.admin, role.user],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

userSchema.plugin(timestamps);

const UserSchema = mongoose.model("User", userSchema);
module.exports = { UserSchema };
