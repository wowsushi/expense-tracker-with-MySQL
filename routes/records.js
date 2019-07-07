const express = require('express')
const router = express.Router()

const Record = require('../models/record.js')
const { authenticated } = require('../config/auth.js')
const categories = require('../data/categories.json').categories
const months = require('../data/months.json').months

router.get('/new', authenticated, (req, res) => {
  res.render('new', { categories })
})

router.post('/', (req, res) => {
  const record = new Record({
    name: req.body.name,
    category: req.body.category, 
    date: req.body.date,
    amount: req.body.amount,
    userId: req.user._id
  })

  record.save( err => {
    if (err) console.log(err)
    res.redirect('/')
  })
  
})

router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({_id: req.params.id, userId: req.user._id}, (err, record) => {
    if (err) return err
    const formattedDate = `${record.date.getFullYear()}-${(record.date.getMonth() + 1).toString().padStart(2, '0')}-${record.date.getDate().toString().padStart(2, '0')}`
    res.render('edit', { record, categories, formattedDate })
  })
})

router.put('/:id/edit', (req, res) => {
  Record.findOne({_id: req.params.id, userId: req.user._id}, (err, record) => {
    if (err) return err
    record.name = req.body.name
    record.category = req.body.category
    record.date = req.body.date
    record.amount = req.body.amount

    record.save( err => {
      if (err) return err
        return res.redirect('/')
    })
  })
})

router.delete('/:id/delete', (req, res) => {
  Record.findOne({_id: req.params.id, userId: req.user._id}, (err, record) => {
    if (err) return err
    record.remove( err => {
      if (err) return err
        return res.redirect('/')
    })
  })
})

module.exports = router