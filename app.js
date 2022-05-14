const express = require('express')
const app = express()
const port = 3000
const exphts = require('express-handlebars')
const restaurants = require('./restaurant.json')

app.engine('handlebars', exphts({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurants.results })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})