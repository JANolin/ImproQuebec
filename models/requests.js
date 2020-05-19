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

    async.waterfall([ function(callback) { pool.getConnection(function(err,connection){ if (err) {
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


function handle_database_check_notifs(req, callback) {

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
            var SQLquery = "SELECT * from notifications WHERE user_id = '"+req.session.key.user_id+"'";
            callback(null,connection,SQLquery);
        },
        function(connection,SQLquery,callback) {
            connection.query(SQLquery,function(err,rows){
                connection.release()
                if(!err) {
                    if(rows == undefined || rows.length < 1)
                    {
                        callback('Pas de notif'.red, true)
                    }else
                    {
                        callback(null,rows)
                    }
                } else {
                    callback('GROSSE ERREURE AVEC LA DB POUR LES NOTIFS'.bgRed,true)
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


function handle_database_notify_coach(queryFindCoach, matchId, callback) {
    async.waterfall([
        function(callback) {
            pool.getConnection(function(err,connection){
                if (err) {
                    callback(true);
                } else {
                    callback(null,queryFindCoach, connection);
                }
            });
        },
        function(queryFindCoach, connection, callback) {
            connection.query(queryFindCoach,function(err,rows){
                if(!err) {
                    if(rows == undefined || rows.length < 1)
                    {
                        callback('Pas de coach avec ce nom'.red, true)
                    }else
                    {
                        callback(null,rows, connection)
                    }
                } else {
                    console.log(err)
                    callback('GROSSE ERREURE AVEC LA DB POUR TROUVER LE COACH'.bgRed,true)
                }
            });
        },

        function(coach_result, connection, callback) {
            var queryNotification = "INSERT into notifications(user_id, notification_message, notification_match_id) VALUES ('"+coach_result[0].user_id+"', 'Nouveau match a check', '"+matchId+"')"
            connection.query(queryNotification,function(err,rows){
                connection.release()
                if(!err) {
                    callback('Notification envoye avec succes au coach : '.green + coach_result[0].coach_name, false)
                } else {
                    //on devrait normalement jamais se rendre ici, mais bon... 
                    //js parfois...
                    callback('Notification impossible: le coach n\'existe pas...'.red,true)
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

function handle_database_prepare_feuille_match(query, callback) {

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
            callback(null,connection,query);
        },
        function(connection,SQLquery,callback) {
            connection.query(SQLquery,function(err,response){
                //connection.release()
                if(!err) {
                    if(response == undefined || response.length < 1)
                    {
                        callback('Pas de donnees dans la DB'.red, true)
                    }else
                    {
                        for(let i = 0; i < response.length; i++)
                        {
                            let currentCegep = response[i]
                            let queryEquipe = "SELECT * FROM equipes WHERE cegep_id="+response[i].cegep_id+""

                            connection.query(queryEquipe, (err,responseEquipe)=>{
                                if(responseEquipe != undefined && responseEquipe.length > 0)
                                {
                                    console.log('LES EQUIPES DU CEGEP : '+response[i].cegep_name)
                                    for(let j = 0; j < responseEquipe.length; j++)
                                    {
                                        let currentEquipe = responseEquipe[j]
                                        let queryCoach = "SELECT * FROM coaches WHERE equipe_id="+responseEquipe[j].equipe_id+""
                                        connection.query(queryCoach, (err,responseCoach)=>{
                                            if(responseEquipe != undefined && responseEquipe.length > 0)
                                            {
                                                console.log('LES COACHES DE LEQUIPE : '+responseEquipe[j].equipe_name)
                                                for(let k = 0; k < responseCoach.length; k++)
                                                {
                                                    console.log(responseCoach[k].coach_name)
                                                }
                                            }else
                                            {
                                                console.log('pas de coach')
                                            }
                                        })
                                    }
                                }else
                                {
                                    console.log('pas dequipe')
                                }
                            })

                        }

                        connection.release()
                        callback(null,'future array avec les donnes')
                    }
                } else {
                    console.log(err)
                    callback('GROSSE ERREURE AVEC LA DB POUR LES FEUILLES DE MATCH'.bgRed,true)
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


function handle_database_check_associations(callback) {

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
            var queryCegep = "SELECT * FROM cegep"
            connection.query(queryCegep,function(err,responseCegep){
                if(!err) {
                    if(responseCegep == undefined || responseCegep.length < 1)
                    {
                        callback('Pas de cegep'.red, true)
                    }else
                    {
                        callback(null,connection,responseCegep)
                    }
                } else {
                    callback('GROSSE ERREURE AVEC LA DB POUR LES NOTIFS'.bgRed,true)
                }
            });
        },
        function(connection,responseCegep,callback) {
            let queryEquipe = "SELECT * FROM equipes"
            connection.query(queryEquipe,function(err,responseEquipe){
                if(!err) {
                    if(responseEquipe == undefined || responseEquipe.length < 1)
                    {
                        callback('Pas de equipe'.red, true)
                    }else
                    {
                        callback(null,connection,responseCegep,responseEquipe)
                    }
                } else {
                    callback('GROSSE ERREURE AVEC LA DB POUR LES NOTIFS'.bgRed,true)
                }
            });
        },
        function(connection,responseCegep,responseEquipe,callback) {
            let queryCoach = "SELECT * FROM coaches"
            connection.query(queryCoach,function(err,responseCoach){
                connection.release()
                if(!err) {
                    if(responseCoach == undefined || responseCoach.length < 1)
                    {
                        callback('Pas de coach'.red, true)
                    }else
                    {
                        callback(null,responseCegep,responseEquipe,responseCoach)
                    }
                } else {
                    callback('GROSSE ERREURE AVEC LA DB POUR LES NOTIFS'.bgRed,true)
                }
            });
        },
        function(responseCegep,responseEquipe,responseCoach){
            let data = [responseCegep, responseEquipe, responseCoach] 
            let equipes = {}
            let coaches = {}
            let cegep = {}
            let ce = {}
            

            for(let i = 0; i < responseCegep.length; i++)
            {
                cegep[responseCegep[i].cegep_name] = []
                let currentCegep = responseCegep[i]
                //console.log('Equipe du cegep : ' + currentCegep.cegep_name)
                for(let j = 0; j < responseEquipe.length; j++)
                {
                    if(responseEquipe[j].cegep_id == currentCegep.cegep_id)
                    {
                        equipes[responseEquipe[j].equipe_name] = []
                        //console.log(responseEquipe[j].equipe_name)
                        let currentEquipe = responseEquipe[j]
                        //console.log('Coach de l\'equipe : ' + currentEquipe.equipe_name)
                        for(let k = 0; k < responseCoach.length; k++)
                        {
                            if(responseCoach[k].equipe_id == currentEquipe.equipe_id)
                            {
                                //console.log(responseCoach[k].coach_name)
                                equipes[currentEquipe.equipe_name].push(responseCoach[k].coach_name)
                            }
                        }
                        cegep[currentCegep.cegep_name].push(equipes)
                        equipes = {}
                    }

                }
            }


            //console.log(equipes)
            //console.log(cegep.BDEB)

            callback(data, false)
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

function handle_database_validation_feuille(req, matchId,callback) {

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
            var queryCegep = "SELECT * FROM coaches WHERE user_id = '"+req.session.key['user_id']+"'"

            connection.query(queryCegep,function(err,responseCoach){
                if(!err) {
                    if(responseCoach == undefined || responseCoach.length < 1)
                    {
                        callback('Pas de coaches'.red, true)
                    }else
                    {
                        callback(null,connection,responseCoach)
                    }
                } else {
                    callback('GROSSE ERREURE AVEC LA DB POUR LES VALIDATIONS'.bgRed,true)
                }
            });
        },
        function(connection,responseCoach,callback) {
            let queryEquipe = "SELECT * FROM notifications WHERE user_id = '"+req.session.key['user_id']+"' AND notification_match_id = '"+matchId+"'"
            connection.query(queryEquipe,function(err,responseNotif){
                if(!err) {
                    if(responseNotif == undefined || responseNotif.length < 1)
                    {
                        callback('Pas de feuilles a valider comme ca'.red, true)
                    }else
                    {
                        callback(null,connection)
                    }
                } else {
                    callback('GROSSE ERREURE AVEC LA DB POUR LES NOTIFS'.bgRed,true)
                }
            });
        },
        function(connection, callback) {
            let queryDelete = "DELETE FROM notifications WHERE user_id = '"+req.session.key['user_id']+"' AND notification_match_id = '"+matchId+"'"
            connection.query(queryDelete,function(err,responseDelete){
                connection.release()
                if(!err) {
                        callback(null,false)
                } else {
                    //on devrait jamais se rendre la, mais bon...
                    // a moins que?
                    callback('GROSSE ERREURE AVEC LA DB POUR LES NOTIFS A VALIDER'.bgRed,true)
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

function handle_database_find_validation_perso(req,callback) {

    async.waterfall([ function(callback) { pool.getConnection(function(err,connection){
                if (err) {
                    callback(true);
                } else {
                    callback(null,connection);
                }
            });
        },
        function(connection,callback) {
            var SQLquery = "SELECT * from notifications WHERE user_id='"+req.session.key['user_id']+"'";
            callback(null,connection,SQLquery);
        },
        function(connection,SQLquery,callback) {
            connection.query(SQLquery,function(err,rows){
                connection.release()
                if(!err) {
                    if(rows == undefined || rows.length < 1)
                    {
                        callback('Pas de notif trouve'.red, true)
                    }else
                    {
                        callback(null,rows)
                    }
                } else {
                    callback('Grosse erreure pour trouver notifs'.bgRed,true)
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

function handle_database_find_equipes(req,callback) {

    async.waterfall([ function(callback) { pool.getConnection(function(err,connection){
                if (err) {
                    callback(true);
                } else {
                    callback(null,connection);
                }
            });
        },
        function(connection,callback) {
            var SQLquery = "SELECT * from equipes";
            callback(null,connection,SQLquery);
        },
        function(connection,SQLquery,callback) {
            connection.query(SQLquery,function(err,rows){
                connection.release()
                if(!err) {
                    if(rows == undefined || rows.length < 1)
                    {
                        callback('Pas de equipes trouve'.red, true)
                    }else
                    {
                        callback(null,rows)
                    }
                } else {
                    callback('Grosse erreure pour trouver equipes'.bgRed,true)
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

module.exports = {
    handle_database_login:handle_database_login, 
    handle_database_register:handle_database_register, 
    handle_database_check_perms:handle_database_check_perms,
    handle_database_check_notifs:handle_database_check_notifs,
    handle_database_notify_coach:handle_database_notify_coach,
    handle_database_prepare_feuille_match:handle_database_prepare_feuille_match,
    handle_database_check_associations:handle_database_check_associations,
    handle_database_validation_feuille:handle_database_validation_feuille,
    handle_database_find_validation_perso:handle_database_find_validation_perso,
    handle_database_find_equipes:handle_database_find_equipes
}
