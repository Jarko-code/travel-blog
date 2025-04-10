const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    position: { type: String },
    role: { type: String, required: true },
    personalNumber: { type: String, required: true },
    address: { type: String, required: true },
    profilePicture: { type: String },
    accountStatus: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
