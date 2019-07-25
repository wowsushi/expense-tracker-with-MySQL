const express = require('express')
const router = express.Router()

const db = require('../models')
const Record = db.Record
const User = db.User

const { authenticated } = require('../config/auth.js')
const categories = require('../data/categories.json').categories
const months = require('../data/months.json').months

router.get('/new', authenticated, (req, res) => {
  res.render('new', { categories })
})

router.post('/', (req, res) => {
  Record.create({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
    UserId: req.user.id
  })
  .then((todo) => { return res.redirect('/') })
  .catch((error) => { return res.status(422).json(error) })
})

router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id)
  .then(user => {
    if (!user) throw new Error("user not found");

    return Record.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id
      }
    })
  })
  .then(record => {
    const formattedDate = `${record.date.getFullYear()}-${(record.date.getMonth() + 1).toString().padStart(2, '0')}-${record.date.getDate().toString().padStart(2, '0')}`
    return res.render('edit', { record, categories, formattedDate })
  })
  .catch(error => { return res.status(422).json(error) })
})

router.put('/:id/edit', (req, res) => {
  Record.findOne({ where: { id: req.params.id, UserId: req.user.id } })
  .then(record => {
    record.name = req.body.name
    record.category = req.body.category
    record.date = req.body.date
    record.amount = req.body.amount

    return record.save()
  })
  .then(record => { return res.redirect('/')})
  .catch(error => { return res.status(422).json(error) })
})

router.delete('/:id/delete', (req, res) => {
  Record.findOne({ where: { id: req.params.id, UserId: req.user.id } })
  .then(record => {
    record.destroy({ where: { id: req.params.id, UserId: req.user.id }
  })
  .then(record => { return res.redirect('/') })
  .catch(error => { return res.status(422).json(error) })
  })
})

module.exports = router
