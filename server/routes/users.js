import express from 'express'
import User from '../models/user.js'

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

// Get single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const getUser = await User.findOne({ _id: id })
    if (!getUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User found successfully', user: getUser })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true })

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
