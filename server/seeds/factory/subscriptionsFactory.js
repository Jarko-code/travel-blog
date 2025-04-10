const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker')
const Subscription = require('../../models/subscription')

const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })

async function subscriptionsFactory() {
  try {
    await Subscription.deleteMany({})

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

// Export so you can import elsewhere
module.exports = subscriptionsFactory
