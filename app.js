const express = require('express')
const path = require('path')
const logger = require('./middlewares/logger')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000


//Init the logger middleware 
app.use(logger)

//middleware for handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//handlebars index page
app.get('/', (req, res) => {
    res.render('index')
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'))
app.use('/match', require('./routes/match/match'))

app.post('/', (req, res) => {
    console.log(req.body.inputPassword1)
    res.redirect('/match')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
