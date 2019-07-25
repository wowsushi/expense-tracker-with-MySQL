const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const categories = require('../data/categories.json').categories
const months = require('../data/months.json').months

const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.get('/', (req, res) => {
  let totalAmount = 0
  if (req.isAuthenticated()) {
    Record.findAll({ where: {UserId: req.user.id}})
    .then((records) => {
      records.forEach(record => {
        record.icon = categories[record.category].icon
        record.formattedDate = `${record.date.getFullYear()}/${(record.date.getMonth() + 1)}/${record.date.getDate()}`
        totalAmount += record.amount
      })
      res.render('index', { records, categories, months, totalAmount })
    })
    .catch(error => { return res.status(422).json(error) })
  } else {
    res.render('landing')
  }
})

router.post('/', (req, res) => {
  let { selectedMonth, selectedCategory } = req.body
  let totalAmount = 0

  const filterMonth = (selectedMonth === 'all')? {} : {date: { [Op.between]: [`2019-${+selectedMonth}-02 00:00:00`, `2019-${+selectedMonth}-31 23:59:59`] }}
  const filterCategory = (selectedCategory ==='all')? {} : {category: selectedCategory}

  Record
    .findAll({
      where: {
        UserId: req.user.id,
        ...filterMonth,
        ...filterCategory
      }
    })
    .then((records) => {
      for (record of records) {
        record.icon = categories[record.category].icon
        record.formattedDate = `${record.date.getFullYear()}/${(record.date.getMonth() + 1)}/${record.date.getDate()}`
        totalAmount += record.amount
      }
      res.render('index', {records, categories, months, selectedMonth, selectedCategory, totalAmount})
    })
    .catch(error => { return res.status(422).json(error) })
})


module.exports = router
