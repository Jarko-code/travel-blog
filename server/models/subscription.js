const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
  firstName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)
