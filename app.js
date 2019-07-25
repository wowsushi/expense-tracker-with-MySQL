const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const handlebarHelpers = require('./handlebars-helpers.')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

const db = require('./models')
const Record = db.Record
const User = db.User

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const hbs = exphbs.create({ helpers: {} })

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
    secret: 'foejfjowfif',
    resave: 'false',
    saveUninitialized: 'false'
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())

  require('./config/passport')(passport)

  app.use((req, res, next) => {
    res.locals.user = req.user
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    res.locals.error_msg = req.flash('error_msg')

    next()
  })

app.use('/', require('./routes/index'))

app.listen(3000, () => {
    console.log(`Express is listening on http://localhost:3000`)
})
