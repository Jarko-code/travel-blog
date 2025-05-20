import mongoose from 'mongoose'
import sequence from 'mongoose-sequence'

const AutoIncrement = sequence(mongoose)

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

const Subscription = mongoose.model('Subscription', SubscriptionSchema)
export default Subscription
