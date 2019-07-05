const express = require('express')
const router = express.Router()
const Record = require('../models/record')
// const { authenticated } = require('../config/auth')


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

router.get('/', (req, res) => {
  Record.find().exec((err, records) => {
    records.forEach(record => {
      record.icon = categories[record.category].icon
      record.formattedDate = `${record.date.getFullYear()}/${record.date.getMonth()}/${record.date.getDate()}`
    })
    res.render('index2', { records, categories })
  })
})

module.exports = router