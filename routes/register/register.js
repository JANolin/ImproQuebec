const express = require('express')
const router = express.Router()
const Model = require('../../models/models')
const handler_db = require('../../models/requests')
const utils = require('../../utils/utils')

/**
 IMPORT POUR BRCYPT
**/
const bcrypt = require('bcryptjs');
//NOMBRE DE PASSE POUR SALT LES HASH
const passageSalt = 10

router.get('/', (req, res) => {
    utils.goIfUserAllowed("access", req, res,
        //go
        ()=>{
            utils.normalRendering(req, res)
        },
        //back
        ()=>{
            res.redirect('/')
        })
})

router.post('/', (req, res) => {

    var SQLquery
    bcrypt.hash(req.body.inputPasswordRegister1, passageSalt, function(err, hash) {
        SQLquery = "INSERT into user_login(user_email,user_password,user_name,user_role) VALUES ('"+req.body.inputEmailRegister1+"','"+hash+"','"+req.body.inputUsernameRegister1+"',2)";

        handler_db.handle_database_register(req, SQLquery, (response) => {
            if(response)
            {
                //SI LE COMPTE EXISTE DEJA
                //MEME REDIRECTION MAIS DANS LE FUTURE IL FAUT FAIRE DES MESSAGES
                //POUR LES UTILISATEURS (MESSAGES DERREURS)
                
                //TODO CHANGER CA ET LE ELSE. CA UTILISE LANCIEN SYSTEM, QUAND
                //ON DEVAIT PASSER A LA MAIN LE NOM DE LA RESSOURCE A renderWithPerms
                //MAIS MAINTENANT ON A MIGRER VERS normalRendering(), ET ON A PAS
                //BESOIN DE PASSER LA RSC, MAIS I GUESS QUIL VA FALLOIR TROUVER
                //UNE SOLUTION POUR CE GENRE DE CAS FUCKEs
                utils.renderWithPerms(req, res, 'register', {invalid_user_already_exist : true})
            }else
            {
                //CREATION DE COMPTE AVEC SUCCES
                //res.render('login', {success :{user_creation_success : true} })
                utils.renderWithPerms(req, res, 'login', {user_creation_success : true})
            }

        });
    });

})

module.exports = router
