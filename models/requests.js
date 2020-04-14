const express = require('express')

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

module.exports = {handle_database:handle_database}
