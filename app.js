const express = require('express')
const path = require('path')
const logger = require('./middlewares/logger')
const exphbs = require('express-handlebars')
const Models = require('./models/models')
const handler_db = require('./models/requests')

const app = express()
const port = 3000

/**
 IMPORT POUR BRCYPT
**/
const bcrypt = require('bcryptjs');
//NOMBRE DE PASSE POUR SALT LES HASH
const passageSalt = 10

/**
 IMPORT POUR REDIS
**/
const redis = require('redis')
const session = require('express-session')
const redisStore = require('connect-redis')(session)
const client = redis.createClient()

/**
 IMPORT POUR MYSQL 
**/
const async = require('async')
const mysql = require('mysql')

/**
 CONNEXION AVEC LA BD REDIS
**/
app.use(session({
    secret: 'lpestcaca',
    store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl :  260}),
    saveUninitialized: false,
    resave: false
}));

//Init the logger middleware 
app.use(logger)

//middleware for handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//handlebars index page
app.get('/', (req, res) => {
    if(req.session.key)
    {
        res.redirect('/accueil')
    }else
    {
        res.render('index')
    }
})


//Middleware qui permet la gestion des pages web static en plain html si besoin
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'))
app.use('/match', require('./routes/match/match'))
app.use('/historique', require('./routes/historique/historique'))
app.use('/fiche', require('./routes/fiche/fiche'))
app.use('/register', require('./routes/register/register'))
app.use('/logout', require('./routes/logout/logout'))
app.use('/accueil', require('./routes/accueil/accueil'))

app.post('/', (req, res) => {
    handler_db.handle_database_login(req, (response) => {
        //SI LA REQUETE A PLANTE/ LE COMPTE EXISTE PAS
        if(response === null) {
            //res.redirect('/')
            res.render('index', {error :{invalid_creds : true} })

        } else {
            //SI SON COMPTE EXISTE PAS
            if(!response) {
                //res.redirect('/')
                res.render('index', {error :{invalid_creds : true} })

                //SI SON COMPTE EXISTE
            } else {
                req.session.key = response;
                res.redirect('/accueil')
            }
        }
    });
})

app.listen(port, () => console.log('😂😂😂😂 ImproQuebec 😂😂😂😂'))
