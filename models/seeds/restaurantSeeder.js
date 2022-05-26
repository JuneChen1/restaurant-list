const Restaurant = require('../restaurant')
const restaurants = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurant.create(restaurants)
    .then(() => {
      console.log('seeds created')
    })
    .catch(error => console.log(error))
    .finally(() => db.close())
})
