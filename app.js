const express = require('express')
const app = express()
const port = 3000
const exphts = require('express-handlebars')
const restaurants = require('./restaurant.json')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
console.log(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('handlebars', exphts({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurants.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.results.find(item => req.params.id === item.id.toString())
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const restaurant = restaurants.results.filter(item => {
    if (item.name.toLowerCase().includes(keyword) 
    || item.category.toLowerCase().includes(keyword)) {
      return item
    }
  })

  res.render('index', { restaurant: restaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})