const express = require('express')
const router = express.Router()

const db = require('../models')
const Record = db.Record
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const { authenticated } = require('../config/auth.js')
const categories = require('../data/categories.json').categories
const months = require('../data/months.json').months


router.get('/', authenticated, (req, res) => {
  const budget = req.user.monthlyBudget
  let totalAmount = 0
  let subtotals = []
  let categoryList = []
  let subtotalList = []
  const filterMonth = {date: { [Op.between]: [`2019-01-01`, `2019-01-31`] }}

  Record
  .findAll({
    where: {
      UserId: req.user.id,
      ...filterMonth,
    }
  })
  .then((records) => {
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
  .catch(error => { return res.status(422).json(error) })
})

router.post('/', (req, res) => {
  const budget = req.user.monthlyBudget
  const { selectedMonth } = req.body
  let totalAmount = 0
  let subtotals = []
  let categoryList = []
  let subtotalList = []
  const filterMonth = (selectedMonth === 'all')? {} : {date: { [Op.between]: [`2019-${+selectedMonth}-02 00:00:00`, `2019-${+selectedMonth}-31 23:59:59`] }}

  Record
  .findAll({
    where: {
      UserId: req.user.id,
      ...filterMonth,
    }
  })
  .then((records) => {
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
  .catch(error => { return res.status(422).json(error) })
})

module.exports = router
