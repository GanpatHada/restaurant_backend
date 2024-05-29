const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  profilePicture: String,
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
