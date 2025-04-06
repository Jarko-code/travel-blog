const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker')
const Subscription = require('../models/subscription')
const connectDB = require('../config/db')

const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })

async function seedSubscriptions() {
  try {
    await connectDB()
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
    console.log('Database seeded successfully!')
  } catch (err) {
    console.error('Error seeding database:', err)
  } finally {
    await mongoose.disconnect() // Ensure disconnection happens after all operations
  }
}

// Run immediately if the file is executed directly
if (require.main === module) {
  seedSubscriptions()
}

// Export so you can import elsewhere
module.exports = seedSubscriptions
