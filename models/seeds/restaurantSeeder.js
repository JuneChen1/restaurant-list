const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurants = require('../../restaurant.json').results

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurants)
    .then(() => {
      console.log('seeds created')
    })
    .catch(error => {console.log(error)})
    .finally(() => db.close())
})