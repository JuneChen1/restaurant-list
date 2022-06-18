const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
const exphts = require('express-handlebars')
const bodyParser = require('body-parser')
const usePassport = require('./config/passport')
const flash = require('connect-flash')

const routes = require('./routes')
require('./config/mongoose')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.engine('handlebars', exphts({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
