const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Restaurant = require('../../models/restaurant')

router.use(bodyParser.urlencoded({ extended: true }))

router.use(methodOverride('_method'))

// 新增餐廳
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  req.body.userId = req.user._id
  Restaurant.create(req.body)
    .then(() => { res.redirect('/') })
    .catch(error => console.log(error))
})

// 查看特定餐廳
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
})

// 刪除餐廳
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 修改餐廳資訊
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
