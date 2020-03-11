const express = require('express')
const path = require('path')
const logger = require('./middlewares/logger')
const exphbs = require('express-handlebars')
const Models = require('./models/models')


const app = express()
const port = 3000

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
 SETUP DE LA CONNEXION AVEC MYSQL 
**/
const pool = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user : 'chien',
    password : '1234',
    database : 'improquebec',
    debug : false
});


/**
 CONNEXION AVEC LA BD REDIS
**/
app.use(session({
    secret: 'lpestcaca',
    store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl :  260}),
    saveUninitialized: false,
    resave: false
}));


/**
 FONCTION QUI GERE LES REQUETES ASYNC A LA DB MYSQL
**/
function handle_database(req,type,callback) {
    async.waterfall([
        function(callback) {
            pool.getConnection(function(err,connection){
                if (err) {
                    callback(true);
                } else {
                    callback(null,connection);
                }
            });
        },
        function(connection,callback) {
            var SQLquery;
            switch(type) {
                case "login" :
                    SQLquery = "SELECT * from user_login WHERE user_email='"+req.body.inputUsername1+"' AND user_password='"+req.body.inputPassword1+"'";
                    break;
                case "register" :
                    SQLquery = "INSERT into user_login(user_email,user_password,user_name) VALUES ('"+req.body.user_email+"','"+req.body.user_password+"','"+req.body.user_name+"')";
                    break;
                default :
                    break;
            }
            callback(null,connection,SQLquery);
        },
        function(connection,SQLquery,callback) {
            connection.query(SQLquery,function(err,rows){
                connection.release()
                if(!err) {
                    if(type === "login") {
                        if(rows == undefined || rows.length < 1)
                        {
                            callback(null)
                        }else
                        {
                            callback(rows[0])
                        }
                    } else {
                        callback(false)
                    }
                } else {
                    callback(true)
                }
            });
        }],
        //PERMET LE RETOUR APRES LE CALL ASYNC
        function(result){
            if(typeof(result) === "boolean" && result === true) {
                callback(null)
            } else {
                callback(result)
            }
        });
}



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
        res.redirect('/match')
    }else
    {
        res.render('index')
    }
})

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'))
app.use('/match', require('./routes/match/match'))

app.post('/', (req, res) => {

    handle_database(req,"login",function(response){
        //SI LA REQUETE A PLANTE/ LE COMPTE EXISTE PAS
        if(response === null) {
                res.redirect('/')

        } else {
            //SI SON COMPTE EXISTE PAS
            if(!response) {
                res.redirect('/')

            //SI SON COMPTE EXISTE
            } else {
                req.session.key = response;
                res.redirect('/match')
            }
        }
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
