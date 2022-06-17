const express = require('express')
const app = express()
const port = 3000
const exphts = require('express-handlebars')
const bodyParser = require('body-parser')
const usePassport = require('./config/passport')

const routes = require('./routes')
require('./config/mongoose')

usePassport(app)
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)
app.use(express.static('public'))

app.engine('handlebars', exphts({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
