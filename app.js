const express = require('express')
const app = express()
const port = 3000
const exphts = require('express-handlebars')
const mongoose = require('mongoose')

const routes = require('./routes')

app.use(routes)

require('dotenv').config()

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

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})