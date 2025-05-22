import Subscription from '../models/subscriptionModel.js'

export const createSubscription = async (req, res) => {
  try {
    const { firstName, email } = req.body

    if (!firstName || !email) {
      return res.status(400).json({ error: 'Missing required fields: firstName and email' })
    }

    const existingSubscription = await Subscription.findOne({ email })
    if (existingSubscription) {
      return res.status(409).json({ error: 'Email is already subscribed' })
    }

    const newSubscription = new Subscription({ firstName, email })
    await newSubscription.save()

    res.status(201).json(newSubscription)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
    res.status(200).json(subscriptions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params
    const deletedSubscription = await Subscription.findByIdAndDelete(id)

    if (!deletedSubscription) {
      return res.status(404).json({ message: 'Subscription not found' })
    }

    res.status(200).json({ message: 'Subscription deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
