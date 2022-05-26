const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Restaurant = require('../../models/restaurant')

router.use(bodyParser.urlencoded({ extended: true }))

router.use(methodOverride('_method'))

//新增餐廳
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  Restaurant.create(req.body)
    .then(() => { res.redirect('/') })
    .catch(error => console.log(error))
})

//查看特定餐廳
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
})

//刪除餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//修改餐廳資訊
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router