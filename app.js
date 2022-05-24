const express = require('express')
const app = express()
const port = 3000
const exphts = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')

//連線mongodb
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

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

//首頁
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => { res.render('index', { restaurant }) })
    .catch(error => console.log(error))
  
})

//新增餐廳
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => {res.redirect('/')})
    .catch(error => console.log(error))
})

//查看特定餐廳
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant}))
})

//搜尋餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find()
    .lean()
    .then(items => {
      const restaurants = items.filter(item => {
        if (item.name.toLowerCase().includes(keyword)
          || item.category.toLowerCase().includes(keyword)) {
          return item
        }
      })
      res.render('index', { restaurant: restaurants, keyword })
    })
    .catch(error => console.log(error))
})

//刪除餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//修改餐廳資訊
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
  
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})