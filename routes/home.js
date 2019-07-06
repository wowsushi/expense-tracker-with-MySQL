const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const categories = require('../data/categories.json').categories
const months = require('../data/months.json').months

router.get('/', (req, res) => {
  let totalAmount = 0
  if (req.isAuthenticated()) {
    Record.find({userId: req.user._id}).exec((err, records) => {
      records.forEach(record => {
        record.icon = categories[record.category].icon
        record.formattedDate = `${record.date.getFullYear()}/${(record.date.getMonth() + 1)}/${record.date.getDate()}`
        totalAmount += record.amount
      })
      res.render('index', { records, categories, months, totalAmount })
    })
  } else {
    res.render('landing')
  }
})

router.post('/', (req, res) => {
  let { selectedMonth, selectedCategory } = req.body
  let totalAmount = 0
  const filterMonth = (selectedMonth === 'all')? {} : {date:{$gte: `2019-${+selectedMonth}-01`, $lte: `2019-${+selectedMonth}-31`}}
  const filterCategory = (selectedCategory ==='all')? {} : {category: selectedCategory}

  Record
    .find({userId: req.user._id})
    .find(filterMonth)
    .find(filterCategory)
    .exec((err, records) => {
      for (record of records) {
        record.icon = categories[record.category].icon
        record.formattedDate = `${record.date.getFullYear()}/${(record.date.getMonth() + 1)}/${record.date.getDate()}`
        totalAmount += record.amount
      }
      res.render('index', {records, categories, months, selectedMonth, selectedCategory, totalAmount})
    })
})


module.exports = router