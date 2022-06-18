const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurants = require('../../restaurant.json').results
const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurants: restaurants.slice(0, 3)
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurants: restaurants.slice(3, 6)
  }
]

db.once('open', () => {
  Promise.all(Array.from(SEED_USER, seedUser => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash =>
        User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        })
      )
      .then(user => {
        const userId = user._id
        seedUser.restaurants.forEach(restaurant => {
          restaurant.userId = userId
        })
        return Restaurant.create(seedUser.restaurants)
      })
  }))
    .then(() => {
      console.log('seeds created')
      process.exit()
    })
})
