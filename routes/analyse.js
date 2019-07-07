const express = require('express')
const router = express.Router()

const Record = require('../models/record.js')
const { authenticated } = require('../config/auth.js')
const categories = require('../data/categories.json').categories
const months = require('../data/months.json').months


router.get('/', authenticated, (req, res) => {
  const budget = req.user.monthlyBudget
  let totalAmount = 0
  let subtotals = []
  let categoryList = []
  let subtotalList = []
  const filterMonth = {date:{$gte: `2019-01-01`, $lte: `2019-01-31`}}

  Record
  .find({userId: req.user._id})
  .find(filterMonth)
  .exec((err, records) => {
    for (record of records) {
      totalAmount += record.amount
      if (!subtotals[record.category]) {
        subtotals[record.category] = 0
        subtotals[record.category] += record.amount
      } else {
        subtotals[record.category] + record.amount
      }
    }
    
    for (category in categories) {
      (subtotals[category])? subtotalList.push(+subtotals[category]) : subtotalList.push(0)
      categoryList.push(category)
    }

    const balance = budget - totalAmount
    res.render('analyse', {records, categories, months, totalAmount, budget, balance, categoryList, subtotalList})
  })
})

router.post('/', (req, res) => {
  const budget = req.user.monthlyBudget
  const { selectedMonth } = req.body
  let totalAmount = 0
  let subtotals = []
  let categoryList = []
  let subtotalList = []
  const filterMonth = {date:{$gte: `2019-${+selectedMonth}-01`, $lte: `2019-${+selectedMonth}-31`}}

  Record
  .find({userId: req.user._id})
  .find(filterMonth)
  .exec((err, records) => {
    for (record of records) {
      totalAmount += record.amount
      if (!subtotals[record.category]) {
        subtotals[record.category] = 0
        subtotals[record.category] += record.amount
      } else {
        subtotals[record.category] + record.amount
      }
    }
    
    for (category in categories) {
      (subtotals[category])? subtotalList.push(+subtotals[category]) : subtotalList.push(0)
      categoryList.push(category)
    }

    const balance = budget - totalAmount
    res.render('analyse', {records, categories, months, totalAmount, budget, balance, categoryList, subtotalList, selectedMonth})
  })
})

module.exports = router