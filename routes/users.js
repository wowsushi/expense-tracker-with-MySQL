const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../models/user.js')

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => { 
  const { email, name, password, password2, budget } = req.body
  const errors = []

  if (!email || !name || !password || !password2 || !budget) {
    errors.push({ message: `全部格子都是必填唷`})
  }

  if (!email.indexOf('@') === -1) {
    errors.push({ message: `email 格式錯誤`})
  }

  if (password !== password2) {
    errors.push({ message: `確認密碼不一致`})
  }

  if (isNaN(budget)) {
    errors.push({ message: `每月預算必須是數字`})
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      email,
      name,
      password,
      password2,
      budget
    })
  } else {
    const newUser = new User ({
      name: name,
      email: email,
      password: password,
      monthlyBudget: budget
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash

        newUser.save().then(user => {
          req.flash('success_msg', '註冊成功，請登入使用吧')
          res.redirect('/users/login')
        })
        .catch(err => {
          console.log(err)
        })
      })
    })
  }
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password ) {
    req.flash('error_msg', `全部格子都是必填唷`)
  }

  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出')
  res.redirect('/users/login')
})

module.exports = router