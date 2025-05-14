const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const SubscriptionSchema = new mongoose.Schema(
  {
    _id: Number,
    firstName: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
  },
  { _id: false },
)

SubscriptionSchema.plugin(AutoIncrement, {
  inc_field: '_id',
  id: 'subscriptions',
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)
