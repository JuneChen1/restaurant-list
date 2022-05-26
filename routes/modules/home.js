const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => { res.render('index', { restaurant }) })
    .catch(error => console.log(error))
})

//搜尋餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } }
    ]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurant: restaurants, keyword }))
    .catch(error => console.log(error))
})

module.exports = router