const { UserSchema } = require("../models/userModels");

class UserQueries {
  async createUser(data) {
    const user = new UserSchema(data);
    return await user.save();
  }

  async getUserById(id) {
    return await UserSchema.findById({
      id: id,
    });
  }

  async getUserByFullName(fullName) {
    return await UserSchema.findOne({
      fullName: fullName,
    });
  }

  async getUserByUsernam(username) {
    return await UserSchema.findOne({
      username: username,
    });
  }

  async getUserByEmail(email) {
    return await UserSchema.findOne({
      email: email,
    });
  }

  async getUserByPhone(phone) {
    return await UserSchema.findOne({
      phone: phone,
    });
  }

  async getUserDetailsById(id) {
    return await UserSchema.findOne({
      _id: id,
    });
  }

  async updateUserPassword(email, newPassword) {
    return await UserSchema.findOneAndUpdate(
      { email: email },
      { $set: { password: newPassword } },
      { new: true }
    );
  }

  async getUserDetailsByData(data) {
    return await UserSchema.findOne({
      $or: [
        { fullName: data.fullName },
        { username: data.username },
        { phone: data.phone },
      ],
    });
  }
}

module.exports = new UserQueries();
