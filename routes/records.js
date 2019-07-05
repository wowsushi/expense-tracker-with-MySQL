const express = require('express')
const router = express.Router()

const Record = require('../models/record.js')

const categories = {
  家居物業: {
    category: "家居物業",
    icon: "fas fa-home"
  },
  交通出行: {
    category: "交通出行",
    icon: "fas fa-shuttle-van"
  },
  休閒娛樂: {
    category: "休閒娛樂",
    icon: "fas fa-grin-beam"
  },
  餐飲食品: {
    category: "餐飲食品",
    icon: "fas fa-utensils"
  },
  其他: {
    category: "其他",
    icon: "fas fa-pen"
  }
}

router.get('/new', (req, res) => {
  res.render('new', { categories })
})

router.post('/', (req, res) => {
  const record = new Record({
    name: req.body.name,
    category: req.body.category, 
    date: req.body.date,
    amount: req.body.amount,
    // userId: req.user._id
  })

  record.save( err => {
    if (err) console.log(err)
    res.redirect('/')
  })
  
})

router.get('/:id/edit', (req, res) => {
  Record.findOne({_id: req.params.id}, (err, record) => {
    if (err) return err
    const formattedDate = `${record.date.getFullYear()}-${record.date.getMonth().toString().padStart(2, '0')}-${record.date.getDate().toString().padStart(2, '0')}`
    res.render('edit', { record, categories, formattedDate })
  })
})

router.put('/:id/edit', (req, res) => {
  Record.findOne({_id: req.params.id}, (err, record) => {
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
  Record.findOne({_id: req.params.id}, (err, record) => {
    if (err) return err
    record.remove( err => {
      if (err) return err
        return res.redirect('/')
    })
  })
})

module.exports = router