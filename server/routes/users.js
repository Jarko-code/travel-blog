const express = require('express')
const User = require('../models/user')

const router = express.Router()

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete a subscription by ID
// router.delete('/subscriptions/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     const deletedSubscription = await Subscription.findByIdAndDelete(id)
//     if (!deletedSubscription) {
//       return res.status(404).json({ message: 'Subscription not found' })
//     }
//     res.status(200).json({ message: 'Subscription deleted successfully' })
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// })

module.exports = router
