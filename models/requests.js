const express = require('express')

/**
 IMPORT POUR DOTENV 
**/
const dotenv = require('dotenv').config();
/** IMPORT POUR BRCYPT
**/
const bcrypt = require('bcryptjs');
//NOMBRE DE PASSE POUR SALT LES HASH
const passageSalt = 10

/**
 IMPORT POUR MYSQL 
**/
const async = require('async')
const mysql = require('mysql')

/**
 SETUP DE LA CONNEXION AVEC MYSQL 
**/
const pool = mysql.createPool({
    connectionLimit : process.env.DB_CONNECTION_LIMIT,
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

/**
 FONCTION QUI GERE LES REQUETES ASYNC WATERFALL A LA DB MYSQL
**/
function handle_database_login(req,callback) {
    console.log("Tentative de connexion par : ".cyan + req.body.inputUsername1 + " ...".cyan)

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
            var SQLquery = "SELECT * from user_login WHERE user_name='"+req.body.inputUsername1+"'";
            callback(null,connection,SQLquery);
        },
        function(connection,SQLquery,callback) {
            connection.query(SQLquery,function(err,rows){
                connection.release()
                if(!err) {
                    if(rows == undefined || rows.length < 1)
                    {
                        callback('Connection impossible : Pas de user avec le nom : '.red + req.body.inputUsername1, true)
                    }else
                    {
                        callback(null,rows[0])
                    }
                } else {
                    callback('Grosse erreure lors de la connexion'.bgRed,true)
                }
            });
        },

        function(result,callback) {
            bcrypt.compare(req.body.inputPassword1, result.user_password, (err, isPasswordMatching) => {
                if(isPasswordMatching)
                {
                    callback('Connexion reussie : Mot de passe valide pour : '.green + req.body.inputUsername1, result)
                }else
                {
                    callback('Connecion impossible : Pas le bon mot de passe pour : '.red + req.body.inputUsername1, true)
                }
            });
        }
    ],

        //PERMET LE RETOUR APRES LE CALL ASYNC
        function(err, result){
            console.log(err)
            if(typeof(result) === "boolean" && result === true) {
                callback(null)
            } else {
                callback(result)
            }
        });
}


/**
 FONCTION QUI GERE LES REQUETES DE REGISTER ASYNC WATERFALL A LA DB MYSQL
**/
function handle_database_register(req,SQLquery,callback) {
    console.log("Tentative de d'inscription par : ".cyan + req.body.inputUsernameRegister1 + " ...".cyan)
    async.waterfall([
        function(callback) {
            pool.getConnection(function(err,connection){
                if (err) {
                    callback('Erreur lors de la requete'.bgRed, true);
                } else {
                    callback(null,connection, SQLquery);
                }
            });
        },
        function(connection,SQLquery,callback) {
            connection.query(SQLquery,function(err,rows){
                connection.release()
                if(!err) {
                    callback('Insciption reussie : Compte creer avec succes'.green, false)
                } else {
                    if(err.errno == 1062)
                    {
                        callback('Insciption impossible : L\'utilisateur : '.red + req.body.inputUsernameRegister1 +' existe deja'.red,true)
                    }else
                    {
                        callback('Grosse erreure lors de l\'inscription'.bgRed,true)
                    }
                }
            });
        }
    ],

        //PERMET LE RETOUR APRES LE CALL ASYNC
        function(err, result){
            if(typeof(result) === "boolean" && result === true) {
                console.log(err)
                callback(true)
            } else {
                console.log(err)
                callback(false)
            }
        });
}

function handle_database_check_perms(req, rsc, callback) {
    let user_role
    if(req.session.key === undefined)
    {
        user_role = 5
    }else
    {
        user_role = req.session.key.user_role
    }

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
            var SQLquery = "SELECT * from permissions_god WHERE role_id = '"+user_role+"' AND resource_id = '"+rsc+"'";
            callback(null,connection,SQLquery);
        },
        function(connection,SQLquery,callback) {
            connection.query(SQLquery,function(err,rows){
                connection.release()
                if(!err) {
                    if(rows == undefined || rows.length < 1)
                    {
                        callback('Acces refuse pour la ressource : '.red + rsc+' par un : '.red + user_role+''.red, true)
                    }else
                    {
                        callback(null,rows)
                    }
                } else {
                    callback('GROSSE ERREURE AVEC LA DB POUR LES PERMS'.bgRed,true)
                }
            });
        }
    ],

        //PERMET LE RETOUR APRES LE CALL ASYNC
        function(err, result){
            if(typeof(result) === "boolean" && result === true) {
                callback(null)
            } else {
                callback(result)
            }
        });
}

module.exports = {handle_database_login:handle_database_login, handle_database_register:handle_database_register, handle_database_check_perms:handle_database_check_perms}
