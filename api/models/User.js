const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
  hasChatsWith: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    }
  ] 
})

module.exports = mongoose.model("User", UserSchema)