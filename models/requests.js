const express = require('express')

/**
 IMPORT POUR DOTENV 
**/
const dotenv = require('dotenv').config();

/**
 IMPORT POUR BRCYPT
**/
const bcrypt = require('bcrypt');
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
                        callback('erreur: pas de user avec ce nom', true)
                    }else
                    {
                        callback(null,rows[0])
                    }
                } else {
                    console.log(err)
                    callback('grosse erreure',true)
                }
            });
        },

        function(result,callback) {
            bcrypt.compare(req.body.inputPassword1, result.user_password, (err, isPasswordMatching) => {
                if(isPasswordMatching)
                {
                    callback('Mot de passe valide', result)
                }else
                {
                    callback('pas le bon mdp', true)
                }
            });
        }
    ],

        //PERMET LE RETOUR APRES LE CALL ASYNC
        function(err, result){
            if(typeof(result) === "boolean" && result === true) {
                console.log(err)
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
    async.waterfall([
        function(callback) {
            pool.getConnection(function(err,connection){
                if (err) {
                    callback('Erreur lors de la requete', true);
                } else {
                    callback(null,connection, SQLquery);
                }
            });
        },
        function(connection,SQLquery,callback) {
            connection.query(SQLquery,function(err,rows){
                connection.release()
                if(!err) {
                    callback('compte creer avec succes', false)
                } else {
                    if(err.errno == 1062)
                    {
                        callback('L\'utilisateur existe deja',true)
                    }else
                    {
                        console.log(err)
                        callback('grosse erreure',true)
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

module.exports = {handle_database_login:handle_database_login, handle_database_register:handle_database_register}
