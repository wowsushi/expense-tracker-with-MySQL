const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const recordList = require('../../data/record.json').records
const userList = require('../../data/user.json').users

const Record = require('../record.js')
const User = require('../user.js')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('error')
})

db.once('open', () => {
  console.log('db connected!')

  userList.forEach((user, index) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err

        User.create({
          email: user.email,
          password: hash
        })
        .then(user => {
          const records = index ? recordList.slice(6, 10) : recordList.slice(0, 5)

          records.forEach(record => {
            Record.create({
              name: record.name,
              category: record.category,
              amount: record.amount,
              date: record.date,
              userId: user._id
            })
          })
        })
      })
    })
  })

  console.log('done.')
})