const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
  firstName: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)
