import express from 'express'
import {
  createSubscription,
  getAllSubscriptions,
  deleteSubscription,
} from '../controllers/subscriptionController.js'

const router = express.Router()

router.post('/subscriptions', createSubscription)
router.get('/subscriptions', getAllSubscriptions)
router.delete('/subscriptions/:id', deleteSubscription)

export default router
