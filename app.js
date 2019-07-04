const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log(`Express is listening on http://localhost:3000`)
})