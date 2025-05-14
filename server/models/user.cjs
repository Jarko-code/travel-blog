const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const UserSchema = new mongoose.Schema(
  {
    _id: Number,
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    position: { type: String },
    description: { type: String },
    role: {
      type: String,
      required: true,
      enum: ['Admin', 'Editor', 'User'],
      default: 'User',
    },
    personalNumber: { type: String, required: true },
    address: {
      street: { type: String },
      postcode: { type: String },
      city: { type: String },
    },
    profilePicture: { type: String },
    accountStatus: {
      type: String,
      required: true,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  { timestamps: true, _id: false },
)

UserSchema.plugin(AutoIncrement, {
  inc_field: '_id',
  id: 'users',
})

module.exports = mongoose.model('User', UserSchema)
