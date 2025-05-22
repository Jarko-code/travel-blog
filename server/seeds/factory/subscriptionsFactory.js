import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import Subscription from '../../models/subscriptionModel.js'

async function subscriptionsFactory() {
  try {
    const exists = await Subscription.exists({})
    if (exists) {
      console.log('Subscriptions already exist. Skipping seeding.')
      return
    }

    // Create an array of promises
    const subscriptionPromises = []

    for (let i = 0; i < 200; i++) {
      const newSubscription = new Subscription({
        firstName: faker.person.firstName(),
        email: faker.internet.email(),
      })
      subscriptionPromises.push(newSubscription.save()) // Collect promises
    }

    await Promise.all(subscriptionPromises) // Wait for all to complete
  } catch (err) {
    console.error('Error seeding subscription:', err)
  }
}

export default subscriptionsFactory
