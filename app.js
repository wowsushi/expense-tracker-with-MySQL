const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = requier('method-override')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection

db.on( 'error', () => {
    console.log('db connect fail')
})

db.once('open', () => {
    console.log('db connected!')
})

app.use('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log(`Express is listening on http://localhost:3000`)
})