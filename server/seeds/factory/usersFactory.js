const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker')
const User = require('../../models/user')

const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })

async function usersFactory() {
  try {
    await User.deleteMany({})

    // Create an array of promises
    const userPromises = []
    const roles = ['Admin', 'Editor', 'User']
    const statuses = ['Active', 'Inactive']

    for (let i = 0; i < 200; i++) {
      const role = roles[Math.floor(Math.random() * roles.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      const newUsers = new User({
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phoneNumber: faker.phone.number({ style: 'international' }),
        position: faker.person.jobTitle(),
        role: role,
        personalNumber: faker.number.binary(255),
        address: {
          street: faker.location.street(),
          postcode: faker.location.zipCode(),
          city: faker.location.city(),
        },
        profilePicture: faker.image.avatar(),
        accountStatus: status,
      })
      userPromises.push(newUsers.save()) // Collect promises
    }

    await Promise.all(userPromises) // Wait for all to complete
  } catch (err) {
    console.error('Error seeding users:', err)
  }
}

// Export so you can import elsewhere
module.exports = usersFactory
