const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker')
const bcrypt = require('bcryptjs')
const User = require('../../models/user.cjs')

async function usersFactory() {
  try {
    const exists = await User.exists({})
    if (exists) {
      console.log('Users already exist. Skipping seeding.')
      return
    }

    // Check if test user exists and if not, create him
    const existingTestUser = await User.findOne({ email: 'test@example.com' })
    if (!existingTestUser) {
      const hashedPassword = await bcrypt.hash('password1234+', 10)

      const testUser = new User({
        name: 'Test',
        surname: 'User',
        email: 'test@example.com',
        password: hashedPassword,
        phoneNumber: '123456789',
        position: 'Team lead',
        description: faker.hacker.phrase(),
        role: 'Admin',
        personalNumber: '901530',
        address: {
          street: 'Povstalecka 15',
          postcode: '040 01',
          city: 'Kosice',
        },
        profilePicture: faker.image.avatar(),
        accountStatus: 'Active',
      })

      await testUser.save()
      console.log('Test user created.')
    } else {
      console.log('Test user already exists, skipping creation.')
    }

    // Genereta fake users
    const userPromises = []
    const roles = ['Admin', 'Editor', 'User']
    const statuses = ['Active', 'Inactive']

    for (let i = 0; i < 200; i++) {
      const role = roles[Math.floor(Math.random() * roles.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      const newUser = new User({
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
        phoneNumber: faker.phone.number({ style: 'international' }),
        position: faker.person.jobTitle(),
        description: faker.hacker.phrase(),
        role,
        personalNumber: faker.number.binary(255),
        address: {
          street: faker.location.street(),
          postcode: faker.location.zipCode(),
          city: faker.location.city(),
        },
        profilePicture: faker.image.avatar(),
        accountStatus: status,
      })
      userPromises.push(newUser.save())
    }

    await Promise.all(userPromises)

    console.log('Seeding completed successfully')
  } catch (err) {
    console.error('Error seeding users:', err)
  }
}

module.exports = usersFactory
