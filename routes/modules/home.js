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
  const sortKey = req.query.sort
  const sortMethod = {
    name_asc: { name: 'asc' },
    name_desc: { name: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' }
  }

  const sort = {
    name_asc: 'A -> Z',
    name_desc: 'Z -> A',
    category: '類別',
    location: '地區'
  }

  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } }
    ]
  })
    .lean()
    .sort(sortMethod[sortKey])
    .then(restaurants => res.render('index', { restaurant: restaurants, keyword, sort: sort[sortKey] }))
    .catch(error => console.log(error))
})

module.exports = router
