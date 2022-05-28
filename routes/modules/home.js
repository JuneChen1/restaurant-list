const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => { res.render('index', { restaurant }) })
    .catch(error => console.log(error))
})

// 搜尋餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const [property, sortBy] = req.query.sort.split('_')

  const sort = {
    name_asc: 'A -> Z',
    name_desc: 'Z -> A',
    category_asc: '類別',
    location_asc: '地區'
  }

  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } }
    ]
  })
    .lean()
    .sort({ [property]: sortBy })
    .then(restaurants => res.render('index', { restaurant: restaurants, keyword, sort: sort[req.query.sort] }))
    .catch(error => console.log(error))
})

module.exports = router
